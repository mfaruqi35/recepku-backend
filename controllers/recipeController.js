import { verifyToken } from "../middleware/auth.js";
import commentsModel from "../models/commentsModel.js";
import recipesModel from "../models/recipesModel.js";
import cloudinary, { uploadToCloudinary } from "../utils/cloudinary.js";

export const createRecipe = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }

      const userId = req.user.userId;
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

export const getLandingRecipe = async (req, res) => {
  try {
    const recipes = await recipesModel
      .find()
      .select("title shortDescription thumbnail");

    return res.status(200).json({
      message: "Landing page recipes fetched successfully",
      status: 200,
      data: recipes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllRecipe = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }
      const recipes = await recipesModel
        .find()
        .select("title shortDescription thumbnail");

      const recipeWithRating = await Promise.all(
        recipes.map(async (recipe) => {
          const comments = await commentsModel.find({ recipeId: recipe._id });

          const totalComments = comments.length;
          const avgRating =
            totalComments > 0
              ? comments.reduce((sum, r) => sum + r.rating, 0) / totalComments
              : 0;

          return {
            ...recipe.toObject(),
            averageRating: Number(avgRating.toFixed(1)),
            totalComments,
          };
        })
      );
      return res.status(200).json({
        message: "All recipes retrieved successfully",
        status: 200,
        data: recipeWithRating,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];

export const getMyRecipes = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }
      const { userId } = req.params;
      const recipes = await recipesModel
        .find({ userId })
        .select("title shortDescription thumbnail");

      return res.status(200).json({
        message: "My recipes retrieved successfully",
        status: 200,
        data: recipes,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];

export const getRecipeDetail = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }
      const recipeId = req.params.recipeId;
      const recipe = await recipesModel
        .findById(recipeId)
        .populate("userId", "userName profilePic");

      if (!recipe) {
        return res
          .status(404)
          .json({ message: "Recipe not found", status: 404, recipe: null });
      }

      const comments = await commentsModel.find({ recipeId: recipe._id });
      const totalComments = comments.length;
      const avgRating =
        totalComments > 0
          ? comments.reduce((sum, r) => sum + r.rating, 0) / totalComments
          : 0;

      return res.status(200).json({
        message: "Recipe detail successfully retrieved",
        status: 200,
        data: {
          ...recipe.toObject(),
          averageRating: Number(avgRating.toFixed(1)),
          totalComments,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];

export const getMyRecipeDetail = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }
      const recipeId = req.params.recipeId;
      const userId = req.user.userId;

      const myRecipe = await recipesModel.findOne({
        _id: recipeId,
        userId: userId,
      });

      if (!myRecipe) {
        return res.status(404).json({
          message: "Recipe not found or user unauthorized",
          status: 404,
          recipe: null,
        });
      }

      return res.status(200).json({
        message: "My recipe detail fetched successfully",
        status: 200,
        recipe: myRecipe,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];

export const editRecipe = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }
      const userId = req.user.userId;
      const recipeId = req.params.recipeId;
      const recipe = await recipesModel.findOne({
        _id: recipeId,
        userId: userId,
      });
      if (!recipe) {
        return res.status(404).json({
          message: "Recipe not found or user unauthorized",
          status: 404,
          recipe: null,
        });
      }
      const {
        title,
        shortDescription,
        ingredients,
        instructions,
        additionalInfo,
        category,
      } = req.body;
      const file = req.files?.["thumbnail"]?.[0];

      if (title) recipe.title = title;
      if (shortDescription) recipe.shortDescription = shortDescription;
      if (ingredients) recipe.ingredients = JSON.parse(ingredients);
      if (instructions) recipe.instructions = instructions;
      if (additionalInfo) recipe.additionalInfo = additionalInfo;
      if (category) recipe.category = category;

      if (file) {
        if (recipe.thumbnail) {
          await cloudinary.uploader.destroy(`recipes/${recipe.thumbnail}`);
        }

        const alias = `recipe-${title
          ?.toLowerCase()
          .replace(/\s+/g, "-")}-${Date.now()}`;

        const uploadResult = await uploadToCloudinary(
          file.buffer,
          "thumbnail",
          alias
        );

        recipe.thumbnail = uploadResult.secure_url;
        recipe.thumbnailAlias = uploadResult.public_id;
      }

      await recipe.save();
      return res.status(200).json({
        message: "Recipe is updated successfully",
        status: 200,
        data: recipe,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];

export const deleteRecipe = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }
      const { userId } = req.params;
      const { recipeId } = req.params;
      if (!recipeId) {
        return res
          .status(400)
          .json({ message: "recipeId is required but not provide" });
      }

      const deleteRecipe = await recipesModel.findOne({
        _id: recipeId,
        userId: userId,
      });

      if (deleteRecipe.thumbnail) {
        await cloudinary.uploader.destroy(`recipes/${deleteRecipe.thumbnail}`);
      }

      await recipesModel.deleteOne({ _id: recipeId });
      return res.status(200).json({
        message: "Recipe deleted successfully",
        status: 200,
        data: deleteRecipe,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];

export const toggleLikeRecipe = [
  verifyToken,
  async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          message: "User authentication failed or invalid user data",
          status: 401,
          data: null,
        });
      }
      const userId = req.user.userId;
      const { recipeId } = req.params;

      const recipe = await recipesModel.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const alreadyLiked = recipe.likes.includes(userId);
      if (alreadyLiked) {
        //Unlike
        recipe.likes.pull(userId);
        recipe.likeCount -= 1;
      } else {
        //Like
        recipe.likes.push(userId);
        recipe.likeCount += 1;
      }
      await recipe.save();

      res.status(200).json({
        liked: !alreadyLiked,
        likeCount: recipe.likeCount,
      });
    } catch (error) {
      return res.status(500).json({ error: message });
    }
  },
];

export const incrementShareCount = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await recipesModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ status: 404, message: "Recipe not found" });
    }
    recipe.shareCount += 1;
    await recipe.save();

    res.status(200).json({
      shareCount: recipe.shareCount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
