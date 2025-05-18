import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import commentsModel from "../models/commentsModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createComment = [
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
      const userId = req.user.userId;
      const { recipeId } = req.params;
      const { commentText, rating } = req.body;
      const file = req.files?.["image"]?.[0];

      if (!commentText || !rating) {
        return res.status(400).json({
          message: "Please fill all required fields",
          status: 400,
          data: null,
        });
      }

      if (rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating invalid", status: 400, data: null });
      }

      let imageUrl = null;
      let imageAlias = null;

      if (file) {
        const alias = `comment-${commentText
          .toLowerCase()
          .replace(/\s+/g, "-")}-${Date.now()}`;
        const uploadResult = await uploadToCloudinary(
          file.buffer,
          "comments",
          alias
        );
        imageUrl = upload.secure_url;
        imageAlias = uploadResult.public_id;
      }

      const comment = new commentsModel({
        userId: userId,
        recipeId: recipeId,
        commentText,
        rating,
        image: imageUrl,
        imageAlias: imageAlias,
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
    const { recipeId } = req.params;
    const comments = await commentsModel
      .find({ recipeId })
      .populate("userId", "userName profilePic")
      .populate("replies.userId", "userName profilePic");

    const commentData = comments.map((r) => ({
      commentId: r._id,
      userName: r.userId?.userName,
      profilePic: r.userId?.profilePic,
      commentText: r.commentText,
      rating: r.rating,
      replies: r.replies.map((reply) => ({
        commentText: reply.commentText,
        createdAt: reply.createdAt,
        userName: reply.userId?.userName,
        profilePic: reply.userId?.profilePic,
      })),
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
      const userId = req.user.userId;

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
