import express from "express";

const messageRoutes = express.Router();

messageRoutes.get("/conversation", (req, res) => {
  res.send("Retrieved conversation history");
});

export default messageRoutes;
