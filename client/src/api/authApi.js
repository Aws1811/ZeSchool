import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
const api = axios.create({
    baseURL: `${serverUrl}/api`,
});

export async function registerParentAccount(accountData) {
    const response = await api.post("/auth/register-parent", accountData);
    return response.data;
}

export async function loginAccount(accountData) {
    const response = await api.post("/auth/login", accountData);
    return response.data;
}
