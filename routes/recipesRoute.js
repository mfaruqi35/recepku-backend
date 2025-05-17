import express from "express";
import { uploadImages } from "../middleware/multer.js";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getAllRecipe,
  getMyRecipeDetail,
  getMyRecipes,
  getRecipeDetail,
  incrementShareCount,
  toggleLikeRecipe,
} from "../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.post("/create-recipe", uploadImages, createRecipe);
recipeRouter.get("/my-recipes", getMyRecipes);
recipeRouter.get("/", getAllRecipe);
recipeRouter.get("/:recipeId", getRecipeDetail);
recipeRouter.get("/my-recipes/:recipeId", getMyRecipeDetail);
recipeRouter.put("/my-recipes/:recipeId", uploadImages, editRecipe);
recipeRouter.patch("/:recipeId/like", toggleLikeRecipe);
recipeRouter.patch("/:recipeId/share", incrementShareCount);
recipeRouter.delete("/my-recipes/:recipeId", deleteRecipe);

export default recipeRouter;
