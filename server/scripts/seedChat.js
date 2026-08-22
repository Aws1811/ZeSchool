require("dotenv").config();
const bcrypt = require("bcryptjs");

const { connectDatabase } = require("../config/mongoose.config");
const User = require("../models/user.model");
const Child = require("../models/child.model");
const { ParentChildLink, TeacherAssignment } = require("../models/access.model");
const { Conversation, Message } = require("../models/chat.model");
const { demoParent, demoTeachers } = require("../data/demoAccounts");

async function seedChat() {
    await connectDatabase();

    const parentPasswordHash = await bcrypt.hash("Parent123!", 10);
    const teacherPasswordHash = await bcrypt.hash("Teacher123!", 10);

    const parent = await User.findOneAndUpdate(
        { email: demoParent.email },
        { ...demoParent, passwordHash: parentPasswordHash },
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );

    const child = await Child.findOneAndUpdate(
        { schoolId: "student-ali" },
        {
            displayName: "Ali Ahmed",
            schoolId: "student-ali",
            gradeLevel: "Grade 5A",
            isActive: true,
        },
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );

    await ParentChildLink.findOneAndUpdate(
        { parentId: parent._id, childId: child._id },
        { parentId: parent._id, childId: child._id, relationship: "parent", status: "active" },
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );

    const oldConversations = await Conversation.find({ childId: child._id, parentId: parent._id }).select("_id");
    await Message.deleteMany({ conversationId: { $in: oldConversations.map((conversation) => conversation._id) } });
    await Conversation.deleteMany({ childId: child._id, parentId: parent._id });

    for (const teacherSeed of demoTeachers) {
        const teacher = await User.findOneAndUpdate(
            { email: teacherSeed.email },
            {
                email: teacherSeed.email,
                displayName: teacherSeed.displayName,
                role: "teacher",
                passwordHash: teacherPasswordHash,
            },
            { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
        );

        await TeacherAssignment.findOneAndUpdate(
            { teacherId: teacher._id, childId: child._id },
            {
                teacherId: teacher._id,
                childId: child._id,
                subject: teacherSeed.subject,
                className: "Grade 5A",
                academicYear: "2026",
                status: "active",
            },
            { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
        );

        if (teacherSeed.email !== demoTeachers[0].email) continue;

        const conversation = await Conversation.findOneAndUpdate(
            { childId: child._id, parentId: parent._id, teacherId: teacher._id },
            {
                childId: child._id,
                parentId: parent._id,
                teacherId: teacher._id,
                subject: teacherSeed.subject,
                status: "open",
            },
            { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
        );

        await Message.deleteMany({ conversationId: conversation._id });
        await Conversation.findByIdAndUpdate(conversation._id, {
            lastMessageAt: conversation.createdAt,
        });
    }

    console.log("Chat demo data created for one parent and four teachers");
}

seedChat()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(`Chat seed failed: ${error.message}`);
        process.exit(1);
    });
