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
    type: String,
  },

  profilePic: {
    type: String,
  },

  savedRecipes: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema);
