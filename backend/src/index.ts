import express from "express";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/messages.route";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// TODO : Add socket.io to server for real-time messaging
// TODO : Configure this server for the deployment
