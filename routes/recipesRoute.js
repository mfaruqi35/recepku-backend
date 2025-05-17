import express from "express";
import { uploadImages } from "../middleware/multer.js";
import {
  createRecipe,
  getAllRecipe,
  getMyRecipeDetail,
  getMyRecipes,
  getRecipeDetail,
} from "../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.post("/create-recipe", uploadImages, createRecipe);
recipeRouter.get("/my-recipes", getMyRecipes);
recipeRouter.get("/", getAllRecipe);
recipeRouter.get("/:recipeId", getRecipeDetail);
recipeRouter.get("/my-recipes/:recipeId", getMyRecipeDetail);

export default recipeRouter;
