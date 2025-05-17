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
userRouter.get("/:userId", getProfile);
userRouter.put("/edit-profile/:userId", uploadImages, editProfile);
userRouter.put("/save-recipe/:recipeId", saveRecipe);
userRouter.get("/saved-recipes", getSavedRecipes);

export default userRouter;
