import jwt from "jsonwebtoken";
import { Response } from "express";
import prisma from "../db/prisma.js";

export const generateAccessToken = async (userId: string, res: Response) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1h",
  });
  return accessToken;
};

export const generateRefreshToken = async (userId: string, res: Response) => {
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });

  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
