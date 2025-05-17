import { verifyToken } from "../middleware/auth.js";
import recipesModel from "../models/recipesModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createRecipe = [
  verifyToken,
  async (req, res) => {
    const userId = req.user.id;
    try {
      // if (!req.user || !req.user._id) {
      //   return res.status(401).json({
      //     message: "User authentication failed or invalid user data",
      //     status: 401,
      //     data: null,
      //   });
      // }

      const {
        title,
        shortDescription,
        ingredients,
        instructions,
        additionalInfo,
        category,
      } = req.body;

      const file = req.files?.["thumbnail"]?.[0];
      if (!title || !ingredients || !instructions || !category) {
        return res.status(400).json({
          message: "Please fill all required fields",
          status: 400,
          data: null,
        });
      }
      if (!file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const alias = `recipe-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}`;
      const uploadResult = await uploadToCloudinary(
        file.buffer,
        "recipes",
        alias
      );

      const parsedIngredients = JSON.parse(ingredients);
      console.log("userId dari token:", userId);

      const recipe = new recipesModel({
        title,
        shortDescription,
        ingredients: parsedIngredients,
        instructions,
        additionalInfo,
        category,
        thumbnail: uploadResult.secure_url,
        thumbnailAlias: uploadResult.public_id,
        userId: userId,
      });

      await recipe.save();

      return res.status(201).json({
        message: "New recipes is created successfully",
        status: 201,
        data: recipe,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
