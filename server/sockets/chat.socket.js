const mongoose = require("mongoose");
const {
    getMessagesForUser,
    createMessageForUser,
} = require("../controllers/chat.controller");

function isValidId(value) {
    return mongoose.Types.ObjectId.isValid(value);
}

function getSocketUserId(socket) {
    const userId = socket.handshake.auth?.userId || socket.handshake.query?.userId;

    if (!isValidId(userId)) {
        return null;
    }

    return new mongoose.Types.ObjectId(userId);
}

function getRoomName(conversationId) {
    return `conversation:${conversationId}`;
}

function registerChatSocket(io) {
    io.on("connection", (socket) => {
        const userId = getSocketUserId(socket);

        if (!userId) {
            socket.emit("chat:error", { message: "A valid userId is required" });
            socket.disconnect();
            return;
        }

        socket.on("chat:join", async ({ conversationId } = {}) => {
            try {
                if (!isValidId(conversationId)) {
                    throw new Error("A valid conversationId is required");
                }

                const history = await getMessagesForUser(conversationId, userId);
                socket.join(getRoomName(conversationId));
                socket.emit("chat:history", history);
            } catch (error) {
                socket.emit("chat:error", { message: error.message });
            }
        });

        socket.on("chat:send", async ({ conversationId, body } = {}) => {
            try {
                if (!isValidId(conversationId)) {
                    throw new Error("A valid conversationId is required");
                }

                const message = await createMessageForUser(conversationId, userId, body);
                delete message.mine;
                io.to(getRoomName(conversationId)).emit("chat:message", message);
            } catch (error) {
                socket.emit("chat:error", { message: error.message });
            }
        });
    });
}

module.exports = { registerChatSocket };
