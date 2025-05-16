import { verifyToken } from "../middleware/auth.js";
import commentsModel from "../models/commentsModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createComment = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { commentText, rating } = req.body;

      if (!commentText || !rating) {
        return res.status(400).json({
          message: "Please fill all required fields",
          status: 400,
          data: null,
        });
      }

      const comment = new commentsModel({
        userId: userId,
        commentText,
        rating,
        createdAt: new Date(),
      });

      await comment.save();

      return res.status(201).json({
        message: "New comment is successfully created",
        status: 201,
        data: comment,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const getAllComment = async (req, res) => {
  try {
    const comments = await commentsModel
      .find()
      .populate("User", "firstName lastName profilePic");

    const commentData = comments.map((r) => ({
      firstName: r.User?.firstName,
      lastName: r.User?.lastName,
      profilePic: r.User?.profilePic,
      commentText: r.commentText,
      rating: r.rating,
      replies: r.replies,
    }));

    return res.status(200).json({ comments: commentData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replyToComment = [
  verifyToken,
  async (req, res) => {
    try {
      const { commentId } = req.params;
      const { commentText } = req.body;
      const userId = req.user._id;

      if (!commentText) {
        return res
          .status(400)
          .json({ message: "Please fill all required fields" });
      }

      const comment = await commentsModel.findById(commentId);
      if (!comment) {
        return res
          .status(404)
          .json({ message: "Comment not found", status: 404, data: null });
      }
      comment.replies.push({
        user: userId,
        commentText,
        createdAt: new Date(),
      });

      await comment.save();

      return res.status(201).json({ message: "Reply is successfully created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
