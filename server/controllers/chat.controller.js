const mongoose = require("mongoose");
const User = require("../models/user.model");
require("../models/child.model");
const { Conversation, Message } = require("../models/chat.model");
const { ParentChildLink, TeacherAssignment } = require("../models/access.model");
const { demoParent, demoTeachers } = require("../data/demoAccounts");

function isValidId(value) {
    return mongoose.Types.ObjectId.isValid(value);
}

function getUserId(value) {
    if (!value || !isValidId(value)) {
        const error = new Error("A valid userId is required");
        error.statusCode = 400;
        throw error;
    }

    return new mongoose.Types.ObjectId(value);
}

function serializeMessage(message, userId) {
    const senderId = message.senderId?._id || message.senderId;

    return {
        id: message._id.toString(),
        conversationId: message.conversationId.toString(),
        senderId: senderId.toString(),
        sender: message.senderId?.displayName || "User",
        text: message.body,
        isRead: message.isRead,
        mine: senderId.toString() === userId.toString(),
        createdAt: message.createdAt,
    };
}

async function getConversationForUser(conversationId, userId) {
    if (!isValidId(conversationId)) {
        const error = new Error("A valid conversationId is required");
        error.statusCode = 400;
        throw error;
    }

    const conversation = await Conversation.findById(conversationId)
        .populate("childId", "displayName")
        .populate("parentId", "displayName role")
        .populate("teacherId", "displayName role");

    if (!conversation) {
        const error = new Error("Conversation not found");
        error.statusCode = 404;
        throw error;
    }

    const isParticipant = [conversation.parentId, conversation.teacherId].some(
        (participant) => participant._id.toString() === userId.toString(),
    );

    if (!isParticipant) {
        const error = new Error("You do not have access to this conversation");
        error.statusCode = 403;
        throw error;
    }

    return conversation;
}

async function serializeConversation(conversation) {
    const lastMessage = await Message.findOne({ conversationId: conversation._id })
        .sort({ createdAt: -1 })
        .populate("senderId", "displayName");

    return {
        id: conversation._id.toString(),
        student: {
            id: conversation.childId._id.toString(),
            name: conversation.childId.displayName,
        },
        parent: {
            id: conversation.parentId._id.toString(),
            name: conversation.parentId.displayName,
        },
        teacher: {
            id: conversation.teacherId._id.toString(),
            name: conversation.teacherId.displayName,
        },
        subject: conversation.subject,
        status: conversation.status,
        lastMessage: lastMessage ? lastMessage.body : "No messages yet",
        lastMessageAt: conversation.lastMessageAt,
    };
}

async function listConversations(req, res, next) {
    try {
        const userId = getUserId(req.query.userId);
        const filter = {
            $or: [{ parentId: userId }, { teacherId: userId }],
            status: "open",
        };

        if (req.query.childId) {
            if (!isValidId(req.query.childId)) {
                return res.status(400).json({ message: "A valid childId is required" });
            }
            filter.childId = req.query.childId;
        }

        const conversations = await Conversation.find(filter)
            .populate("childId", "displayName")
            .populate("parentId", "displayName role")
            .populate("teacherId", "displayName role")
            .sort({ lastMessageAt: -1 });

        const result = await Promise.all(conversations.map(serializeConversation));
        return res.json({ conversations: result });
    } catch (error) {
        return next(error);
    }
}

async function listMessages(req, res, next) {
    try {
        const userId = getUserId(req.query.userId);
        const conversation = await getConversationForUser(req.params.conversationId, userId);
        const messages = await Message.find({ conversationId: conversation._id })
            .populate("senderId", "displayName")
            .sort({ createdAt: 1 });

        await Message.updateMany(
            {
                conversationId: conversation._id,
                senderId: { $ne: userId },
                isRead: false,
            },
            { $set: { isRead: true } },
        );

        return res.json({
            conversation: await serializeConversation(conversation),
            messages: messages.map((message) => serializeMessage(message, userId)),
        });
    } catch (error) {
        return next(error);
    }
}

async function createMessage(req, res, next) {
    try {
        const userId = getUserId(req.body.userId);
        const conversation = await getConversationForUser(req.params.conversationId, userId);
        const body = typeof req.body.body === "string" ? req.body.body.trim() : "";

        if (!body) {
            return res.status(400).json({ message: "Message body is required" });
        }

        if (body.length > 2000) {
            return res.status(400).json({ message: "Message body cannot exceed 2000 characters" });
        }

        const message = await Message.create({
            conversationId: conversation._id,
            senderId: userId,
            body,
        });

        await Conversation.findByIdAndUpdate(conversation._id, {
            lastMessageAt: message.createdAt,
        });

        await message.populate("senderId", "displayName");
        return res.status(201).json({ message: serializeMessage(message, userId) });
    } catch (error) {
        return next(error);
    }
}

async function getDemoAccounts(req, res, next) {
    try {
        if (process.env.NODE_ENV === "production") {
            return res.status(404).json({ message: "Demo accounts are disabled" });
        }

        const emails = [demoParent.email, ...demoTeachers.map((teacher) => teacher.email)];
        const users = await User.find({ email: { $in: emails }, isActive: true }).select("displayName role email");
        const teacherSubjectByEmail = new Map(demoTeachers.map((teacher) => [teacher.email, teacher.subject]));

        return res.json({
            parent: users
                .filter((user) => user.role === "parent")
                .map((user) => ({ id: user._id.toString(), name: user.displayName, email: user.email })),
            teachers: users
                .filter((user) => user.role === "teacher")
                .map((user) => ({
                    id: user._id.toString(),
                    name: user.displayName,
                    email: user.email,
                    subject: teacherSubjectByEmail.get(user.email) || "",
                })),
        });
    } catch (error) {
        return next(error);
    }
}

async function getDemoContext(req, res, next) {
    try {
        if (process.env.NODE_ENV === "production") {
            return res.status(404).json({ message: "Demo context is disabled" });
        }

        const role = req.query.role === "teacher" ? "teacher" : "parent";
        const defaultAccount = role === "teacher" ? demoTeachers[0] : demoParent;
        const userFilter = {
            role,
            isActive: true,
            email: req.query.email || defaultAccount.email,
        };
        const user = await User.findOne(userFilter).select("displayName role email");

        if (!user) {
            return res.status(404).json({ message: "Demo user not found. Run the chat seed command first" });
        }

        const links = role === "parent"
            ? await ParentChildLink.find({ parentId: user._id, status: "active" }).populate("childId", "displayName gradeLevel")
            : await TeacherAssignment.find({ teacherId: user._id, status: "active" }).populate("childId", "displayName gradeLevel");

        return res.json({
            user: {
                id: user._id.toString(),
                name: user.displayName,
                role: user.role,
            },
            students: links.map((link) => ({
                id: link.childId._id.toString(),
                name: link.childId.displayName,
                gradeLevel: link.childId.gradeLevel,
            })),
            conversations: await getUserConversations(user._id, req.query.childId),
        });
    } catch (error) {
        return next(error);
    }
}

async function getUserConversations(userId, childId) {
    const filter = {
        $or: [{ parentId: userId }, { teacherId: userId }],
        status: "open",
    };

    if (childId) filter.childId = childId;

    const conversations = await Conversation.find(filter)
        .populate("childId", "displayName")
        .populate("parentId", "displayName role")
        .populate("teacherId", "displayName role")
        .sort({ lastMessageAt: -1 });

    return Promise.all(conversations.map(serializeConversation));
}

async function getMessagesForUser(conversationId, userId) {
    const conversation = await getConversationForUser(conversationId, userId);
    const messages = await Message.find({ conversationId: conversation._id })
        .populate("senderId", "displayName")
        .sort({ createdAt: 1 });

    return {
        conversation: await serializeConversation(conversation),
        messages: messages.map((message) => serializeMessage(message, userId)),
    };
}

async function createMessageForUser(conversationId, userId, body) {
    const conversation = await getConversationForUser(conversationId, userId);
    const trimmedBody = typeof body === "string" ? body.trim() : "";

    if (!trimmedBody) {
        const error = new Error("Message body is required");
        error.statusCode = 400;
        throw error;
    }

    if (trimmedBody.length > 2000) {
        const error = new Error("Message body cannot exceed 2000 characters");
        error.statusCode = 400;
        throw error;
    }

    const message = await Message.create({
        conversationId: conversation._id,
        senderId: userId,
        body: trimmedBody,
    });

    await Conversation.findByIdAndUpdate(conversation._id, {
        lastMessageAt: message.createdAt,
    });

    await message.populate("senderId", "displayName");
    return serializeMessage(message, userId);
}

async function canUserChatWithChild(userId, childId, role) {
    if (role === "parent") {
        return ParentChildLink.exists({ parentId: userId, childId, status: "active" });
    }

    return TeacherAssignment.exists({ teacherId: userId, childId, status: "active" });
}

module.exports = {
    listConversations,
    listMessages,
    getDemoAccounts,
    getDemoContext,
    createMessage,
    getConversationForUser,
    getUserConversations,
    getMessagesForUser,
    createMessageForUser,
    canUserChatWithChild,
};
