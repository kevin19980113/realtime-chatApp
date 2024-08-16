"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersForSidebar = exports.getMessages = exports.sendMessage = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const socket_1 = require("../socket/socket");
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        let conversation = await prisma_1.default.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                },
            },
        });
        // sending message to receiver for the first time
        if (!conversation) {
            conversation = await prisma_1.default.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId],
                    },
                },
            });
        }
        const newMessage = await prisma_1.default.message.create({
            data: {
                senderId,
                conversationId: conversation.id,
                body: message,
            },
        });
        if (newMessage) {
            conversation = await prisma_1.default.conversation.update({
                where: {
                    id: conversation.id,
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id,
                        },
                    },
                },
            });
        }
        const receiverSocketId = (0, socket_1.getReveiverSocketId)(receiverId);
        // if it's not undeifined, that means the receiver is online
        // then emit event which has new message to the receiver's socket
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in Send Message Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.sendMessage = sendMessage;
const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma_1.default.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, userToChatId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        if (!conversation)
            return res.status(200).json([]);
        return res.status(200).json(conversation.messages);
    }
    catch (error) {
        console.log("Error in Get Messages Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getMessages = getMessages;
const getUsersForSidebar = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const otherUsers = await prisma_1.default.user.findMany({
            where: {
                id: {
                    not: authUserId,
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            },
        });
        return res.status(200).json(otherUsers);
    }
    catch (error) {
        console.log("Error in Get Users For Sidebar Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUsersForSidebar = getUsersForSidebar;
