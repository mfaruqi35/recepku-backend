import express from "express";
import {
  editProfile,
  getProfile,
  getSavedRecipes,
  loginUser,
  registerUser,
  saveRecipe,
} from "../controllers/usersController.js";
import { uploadImages } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile/:userId", getProfile);
userRouter.put("/profile/:userId", uploadImages, editProfile);
userRouter.post("/save-recipe/:recipeId", saveRecipe);
userRouter.get("/saved-recipes/:userId", getSavedRecipes);

export default userRouter;
