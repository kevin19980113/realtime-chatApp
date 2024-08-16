import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

export interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({
        error: "No Bearer Token",
      });

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!,
      async (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid JWT Token" });

        const decodedToken = decoded as DecodedToken;

        const user = await prisma.user.findUnique({
          where: { id: decodedToken.userId },
        });
        if (!user) return res.status(401).json({ error: "Invalid JWT Token" });

        req.user = user;
        next();
      }
    );
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
