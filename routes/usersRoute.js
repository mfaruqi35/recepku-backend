import express from "express";
import {
  editProfile,
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:userId", getProfile);
userRouter.put("/edit-profile/:userId", editProfile);

export default userRouter;
