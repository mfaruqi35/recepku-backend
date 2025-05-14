import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },

  profilePic: {
    type: String,
  },

  likedRecipes: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  savedRecipes: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema);
