import express from "express";
import chatController from "../controllers/chatController";

const router = express.Router();

// Get conversion list
router.get("/conversation", chatController.getAllConversation);

// Get chat history
router.get("/history/:conversationId", chatController.getChatHistory);

// Send a message and get AI response
router.post("/process-message", chatController.processMessage);

export default router;
