import express from "express";
import { uploadImages } from "../middleware/multer.js";
import { createRecipe } from "../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.post("/create-recipe", uploadImages, createRecipe);

export default recipeRouter;
