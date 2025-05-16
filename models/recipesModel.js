import mongoose from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  shortDescription: {
    type: String,
  },

  ingredients: [
    {
      quantity: {
        type: String,
        required: true,
      },
      description: {
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

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  userId: {
    type: Schema.Type.ObjectId,
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
