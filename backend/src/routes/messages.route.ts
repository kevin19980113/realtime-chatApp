import express from "express";
import protectRoute from "../middleware/protectRoute";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/messagesController";

const messageRoutes = express.Router();

messageRoutes.post("/send/:id", protectRoute, sendMessage);
messageRoutes.get("/conversations", protectRoute, getUsersForSidebar);
messageRoutes.get("/:id", protectRoute, getMessages);

export default messageRoutes;
