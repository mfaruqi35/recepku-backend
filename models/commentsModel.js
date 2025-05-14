import mongoose from "mongoose";

const commentSchema = new Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  commentText: {
    type: String,
    required: true,
  },
  craetedAt: {
    type: Date,
    default: Date.now(),
  },
  replies: [
    {
      user: {
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
