import express from "express";
import {
  editProfile,
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/usersController.js";
import { uploadImages } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:userId", getProfile);
userRouter.put("/edit-profile/:userId", uploadImages, editProfile);

export default userRouter;
