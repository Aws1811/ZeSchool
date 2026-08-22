require("dotenv").config();

const http = require("http");
const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
const { connectDatabase } = require("./config/mongoose.config");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const { registerChatSocket } = require("./sockets/chat.socket");

const app = express();
const httpServer = http.createServer(app);
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(httpServer, {
    cors: {
        origin: clientUrl,
        methods: ["GET", "POST"],
    },
});

app.use(
    cors({
        origin: clientUrl,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
registerChatSocket(io);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? "Something went wrong" : error.message;
    console.error(error.message);
    res.status(statusCode).json({ message });
});

async function startServer() {
    await connectDatabase();
    const port = Number(process.env.PORT) || 8000;

    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

if (require.main === module) {
    startServer().catch((error) => {
        console.error(`Server could not start: ${error.message}`);
        process.exit(1);
    });
}

module.exports = { app, httpServer, io, startServer };
