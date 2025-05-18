import express from "express";
import {
  createComment,
  getAllComment,
  replyToComment,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/:recipeId", createComment);
commentRouter.get("/:recipeId", getAllComment);
commentRouter.post("/:commentId/reply", replyToComment);

export default commentRouter;
