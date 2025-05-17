import express from "express";
import { uploadImages } from "../middleware/multer.js";
import { createRecipe, getMyRecipes } from "../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.post("/create-recipe", uploadImages, createRecipe);
recipeRouter.get("/my-recipes", getMyRecipes);

export default recipeRouter;
