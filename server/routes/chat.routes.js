const express = require("express");
const {
    listConversations,
    listMessages,
    getDemoAccounts,
    getDemoContext,
    createMessage,
} = require("../controllers/chat.controller");

const router = express.Router();

router.get("/demo-accounts", getDemoAccounts);
router.get("/demo-context", getDemoContext);
router.get("/conversations", listConversations);
router.get("/conversations/:conversationId/messages", listMessages);
router.post("/conversations/:conversationId/messages", createMessage);

module.exports = router;
