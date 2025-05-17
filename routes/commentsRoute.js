import express from "express";
import {
  createComment,
  getAllComment,
  replyToComment,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/:recipeId/create-comment", createComment);
commentRouter.get("/", getAllComment);
commentRouter.post("/:commentId/reply", replyToComment);

export default commentRouter;
