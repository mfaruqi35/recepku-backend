import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  shortDescription: {
    type: String,
    maxlength: 100,
  },

  ingredients: [
    {
      quantity: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],

  instructions: {
    type: String,
    required: true,
  },

  additionalInfo: {
    type: String,
  },

  category: {
    type: String,
    enum: [
      "Makanan Pembuka",
      "Makanan Utama",
      "Makanan Penutup",
      "Camilan",
      "Minuman",
    ],
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
  },

  thumbnailAlias: {
    type: String,
  },

  rating: {
    type: Number,
    default: 0,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  likeCount: {
    type: Number,
    default: 0,
  },

  shareCount: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Recipe", recipeSchema);
