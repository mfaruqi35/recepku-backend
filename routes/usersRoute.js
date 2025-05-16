import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:userId", getProfile);

export default userRouter;
