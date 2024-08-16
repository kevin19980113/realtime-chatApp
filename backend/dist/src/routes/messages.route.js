"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const messagesController_1 = require("../controllers/messagesController");
const messageRoutes = express_1.default.Router();
messageRoutes.post("/send/:id", protectRoute_1.default, messagesController_1.sendMessage);
messageRoutes.get("/conversations", protectRoute_1.default, messagesController_1.getUsersForSidebar);
messageRoutes.get("/:id", protectRoute_1.default, messagesController_1.getMessages);
exports.default = messageRoutes;
