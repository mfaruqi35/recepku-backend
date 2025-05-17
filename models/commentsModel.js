import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  commentText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  imageAlias: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  replies: [
    {
      User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      commentText: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

export default mongoose.model("Comment", commentSchema);
