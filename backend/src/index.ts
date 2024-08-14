import express from "express";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/messages.route";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
