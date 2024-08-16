import express from "express";
import {
  getMe,
  login,
  logout,
  refresh,
  signup,
} from "../controllers/authController.js";
import protectRoute from "../middleware/protectRoute.js";
import loginLimiter from "../middleware/loginLimiter.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", loginLimiter, login);
authRoutes.post("/logout", logout);
authRoutes.get("/refresh", refresh);
authRoutes.get("/me", protectRoute, getMe);

export default authRoutes;
