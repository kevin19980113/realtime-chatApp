import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReveiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    // sending message to receiver for the first time
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        conversationId: conversation.id,
        body: message,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
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
    const receiverSocketId = getReveiverSocketId(receiverId);

    // if it's not undeifined, that means the receiver is online
    // then emit event which has new message to the receiver's socket
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in Send Message Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
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

    if (!conversation) return res.status(200).json([]);

    return res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.log("Error in Get Messages Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user.id;

    const otherUsers = await prisma.user.findMany({
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
  } catch (error: any) {
    console.log("Error in Get Users For Sidebar Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
