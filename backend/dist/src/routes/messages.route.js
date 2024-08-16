import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, getUsersForSidebar, sendMessage, } from "../controllers/messagesController.js";
const messageRoutes = express.Router();
messageRoutes.post("/send/:id", protectRoute, sendMessage);
messageRoutes.get("/conversations", protectRoute, getUsersForSidebar);
messageRoutes.get("/:id", protectRoute, getMessages);
export default messageRoutes;
