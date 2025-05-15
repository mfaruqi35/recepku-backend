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
      quantity: String,
      description: String,
      notes: String,
    },
  ],
  instructions: [
    {
      step: Number,
      description: String,
    },
  ],

  additionalInfo: {
    type: String,
  },

  category: {
    type: String,
    enum: ["Appetizer", "Main Course", "Dessert", "Snack", "Beverage"],
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

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Recipe", recipeSchema);
