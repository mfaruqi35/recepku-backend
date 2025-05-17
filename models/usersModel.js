import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
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
    default: null,
  },

  profilePic: {
    type: String,
  },

  profilePicAlias: {
    type: String,
  },

  savedRecipes: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema);
