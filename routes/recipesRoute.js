import express from "express";
import { uploadImages } from "../middleware/multer.js";
import {
  createRecipe,
  getAllRecipe,
  getMyRecipes,
} from "../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.post("/create-recipe", uploadImages, createRecipe);
recipeRouter.get("/my-recipes", getMyRecipes);
recipeRouter.get("/", getAllRecipe);

export default recipeRouter;
