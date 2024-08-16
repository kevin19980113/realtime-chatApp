"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.refresh = exports.logout = exports.login = exports.signup = void 0;
const prisma_js_1 = __importDefault(require("../db/prisma.js"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_js_1 = require("../utils/generateToken.js");
const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill in all fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({ error: "Password must be at least 8 characters long." });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }
        const user = await prisma_js_1.default.user.findUnique({ where: { username } });
        if (user) {
            return res.status(400).json({ error: "Username already exists." });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const newUser = await prisma_js_1.default.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
            },
        });
        if (newUser)
            return res.status(201).json({ message: "Signup Successful" });
        res.status(400).json({ error: "Invalid User data" });
    }
    catch (error) {
        console.log("Error in  Signup Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma_js_1.default.user.findUnique({ where: { username } });
        if (!user)
            return res.status(400).json({ error: "No existing username" });
        const isMatch = await bcryptjs_1.default.compare(password, user?.password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid password" });
        const accessToken = await (0, generateToken_js_1.generateAccessToken)(user.id, res);
        await (0, generateToken_js_1.generateRefreshToken)(user.id, res);
        res.status(200).json({
            fullName: user.fullName,
            accessToken,
        });
    }
    catch (error) {
        console.log("Error in Login Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies.jwt)
            return res.sendStatus(204);
        const refreshToken = cookies.jwt;
        const user = await prisma_js_1.default.user.findFirst({
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
        await prisma_js_1.default.user.update({
            where: { id: user.id },
            data: { refreshToken: "" },
        });
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
        });
        return res.status(200).json({ fullName: user.fullName });
    }
    catch (error) {
        console.log("Error in Logout Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.logout = logout;
const refresh = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies.jwt)
            return res.status(401).json({ error: "NO JWT TOKEN" });
        const refreshToken = cookies.jwt;
        const user = await prisma_js_1.default.user.findFirst({
            where: { refreshToken },
        });
        if (!user)
            return res.status(401).json({ error: "Invalid JWT Token" });
        jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            const decodedToken = decoded;
            if (err || decodedToken.userId !== user.id)
                return res.status(401).json({ error: "Invalid JWT Token" });
            const newAccessToken = await (0, generateToken_js_1.generateAccessToken)(user.id, res);
            return res.status(200).json({ accessToken: newAccessToken });
        });
    }
    catch (error) {
        console.log("Error in Refresh Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.refresh = refresh;
const getMe = async (req, res) => {
    try {
        const user = await prisma_js_1.default.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            gender: user.gender,
        });
    }
    catch (error) {
        console.log("Error in GetMe Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getMe = getMe;
