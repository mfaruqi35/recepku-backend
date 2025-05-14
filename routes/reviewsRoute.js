import express from "express";
import { createReview, getAllReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/create-review", createReview);
reviewRouter.get("/", getAllReview);

export default reviewRouter;
