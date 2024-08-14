import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../middleware/protectRoute";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Username already exists." });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });
    if (newUser) {
      return res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    }

    res.status(400).json({ error: "Invalid User data" });
  } catch (error: any) {
    console.log("Error in  Signup Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(400).json({ error: "No existing username" });

    const isMatch = await bcryptjs.compare(password, user?.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const accessToken = await generateToken(user.id, res);
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      accessToken,
    });
  } catch (error: any) {
    console.log("Error in Login Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = await prisma.user.findFirst({
      where: { refreshToken },
    });

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });
      return res.sendStatus(204);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: "" },
    });
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    return res.status(200).json({ username: user.username });
  } catch (error: any) {
    console.log("Error in Logout Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.status(401).json({ error: "NO JWT TOKEN" });

    const refreshToken = cookies.jwt;

    const user = await prisma.user.findFirst({
      where: { refreshToken },
    });
    if (!user) return res.status(401).json({ error: "Invalid JWT Token" });

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
      async (err: jwt.VerifyErrors | null, decoded: any) => {
        const decodedToken = decoded as DecodedToken;
        if (err || decodedToken.userId !== user.id)
          return res.status(401).json({ error: "Invalid JWT Token" });

        const newAccessToken = await generateToken(user.id, res);

        return res.status(200).json({ accessToken: newAccessToken });
      }
    );
  } catch (error: any) {
    console.log("Error in Refresh Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in GetMe Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
