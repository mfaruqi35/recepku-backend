import { verifyToken } from "../middleware/auth.js";
import reviewsModel from "../models/reviewsModel.js";

export const createReview = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { content, rating } = req.body;

      if (!content || !rating) {
        return res
          .status(400)
          .json({ message: "Please fill all required fields" });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must between 1 and 5" });
      }

      const review = new reviewsModel({
        userId: userId,
        content,
        rating,
      });

      await review.save();

      return res
        .status(201)
        .json({ message: "New review is successfully created", data: review });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
