import axios from "axios";
import { io } from "socket.io-client";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
const api = axios.create({
    baseURL: `${serverUrl}/api`,
});

export async function getDemoAccounts() {
    const response = await api.get("/chat/demo-accounts");
    return response.data;
}

export async function getChatContext(role, childId, email) {
    const response = await api.get("/chat/demo-context", {
        params: { role, childId, email },
    });

    return response.data;
}

export async function getConversationMessages(conversationId, userId) {
    const response = await api.get(`/chat/conversations/${conversationId}/messages`, {
        params: { userId },
    });

    return response.data;
}

export function createChatSocket(userId) {
    return io(serverUrl, {
        auth: { userId },
    });
}
