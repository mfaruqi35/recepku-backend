import { verifyToken } from "../middleware/auth";

export const createRecipe = [
  verifyToken,
  async (req, res) => {
    try {
      const {
        title,
        shortDescription,
        ingredients,
        instructions,
        additionalInfo,
        category,
        rating,
      } = req.body;
      if (!title || !ingredients || !instructions || !category) {
        return res.status(400).json({
          message: "Please fill all required fields",
          status: 400,
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
