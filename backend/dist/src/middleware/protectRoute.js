"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_js_1 = __importDefault(require("../db/prisma.js"));
const protectRoute = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader?.startsWith("Bearer "))
            return res.status(401).json({
                error: "No Bearer Token",
            });
        const accessToken = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
            if (err)
                return res.status(401).json({ error: "Invalid JWT Token" });
            const decodedToken = decoded;
            const user = await prisma_js_1.default.user.findUnique({
                where: { id: decodedToken.userId },
            });
            if (!user)
                return res.status(401).json({ error: "Invalid JWT Token" });
            req.user = user;
            next();
        });
    }
    catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.default = protectRoute;
