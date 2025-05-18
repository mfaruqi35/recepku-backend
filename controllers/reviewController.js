import { verifyToken } from "../middleware/auth.js";
import reviewsModel from "../models/reviewsModel.js";

export const createReview = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }
      const userId = req.user?.userId;
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

      return res.status(201).json({
        message: "New review is successfully created",
        status: 201,
        data: review,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const getAllReview = async (req, res) => {
  try {
    const reviews = await reviewsModel
      .find()
      .populate("userId", "userName profilePic");

    const reviewData = reviews.map((r) => ({
      userName: r.userId?.userName,
      profilePic: r.userId?.profilePic,
      content: r.content,
      rating: r.rating,
    }));

    return res.status(200).json({ reviews: reviewData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
