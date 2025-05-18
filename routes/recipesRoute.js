import express from "express";
import { uploadImages } from "../middleware/multer.js";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getAllRecipe,
  getLandingRecipe,
  getMyRecipeDetail,
  getMyRecipes,
  getRecipeDetail,
  incrementShareCount,
  toggleLikeRecipe,
} from "../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.get("/public/landing", getLandingRecipe);
recipeRouter.post("/create-recipe", uploadImages, createRecipe);
recipeRouter.get("/", getAllRecipe);
recipeRouter.get("/my-recipes/:userId", getMyRecipes);
recipeRouter.get("/:recipeId", getRecipeDetail);
recipeRouter.get("/my-recipes/:recipeId", getMyRecipeDetail);
recipeRouter.put("/my-recipes/:recipeId", uploadImages, editRecipe);
recipeRouter.delete("/my-recipes/:userId/:recipeId", deleteRecipe);
recipeRouter.patch("/:recipeId/like", toggleLikeRecipe);
recipeRouter.patch("/:recipeId/share", incrementShareCount);

export default recipeRouter;
