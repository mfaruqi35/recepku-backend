import express from "express";
import { uploadImages } from "../middleware/multer.js";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getAllRecipe,
  getMyRecipeDetail,
  getMyRecipes,
  getRecipeDetail,
  incrementShareCount,
  toggleLikeRecipe,
} from "../controllers/recipeController.js";

const recipeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Endpoints related to recipes in website
 */

/**
 * @swagger
 * /recipes/create-recipe:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - ingredients
 *               - instructions
 *               - category
 *               - thumbnail
 *             properties:
 *               title:
 *                 type: string
 *                 example: Nasi Goreng Spesial
 *               shortDescription:
 *                 type: string
 *                 example: Nasi goreng dengan telur, ayam, dan bumbu khas Indonesia.
 *               ingredients:
 *                 type: string
 *                 example: '[{"quantity": "1 piring", "name": "nasi"}, {"quantity": "2 butir", "name": "telur"}]'
 *                 description: JSON string array of ingredients
 *               instructions:
 *                 type: string
 *                 example: Tumis bumbu, masukkan nasi dan bahan lainnya, lalu aduk rata.
 *               additionalInfo:
 *                 type: string
 *                 example: Cocok disantap saat sarapan.
 *               category:
 *                 type: string
 *                 example: Sarapan
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New recipes is created successfully
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Missing required fields or image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please fill all required fields
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authentication failed or invalid user data
 *       500:
 *         description: Internal server error
 */
recipeRouter.post("/create-recipe", uploadImages, createRecipe);

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes with average rating and total comments
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All recipes retrieved successfully
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6644aaddb1105bb28472f920
 *                       title:
 *                         type: string
 *                         example: Nasi Goreng Spesial
 *                       shortDescription:
 *                         type: string
 *                         example: Nasi goreng lezat dengan telur dan ayam
 *                       thumbnailAlias:
 *                         type: string
 *                         example: recipes/recipe-nasi-goreng-spesial-1715980976821
 *                       averageRating:
 *                         type: number
 *                         format: float
 *                         example: 4.2
 *                       totalComments:
 *                         type: integer
 *                         example: 8
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authentication failed or invalid user data
 *       500:
 *         description: Internal server error
 */
recipeRouter.get("/", getAllRecipe);

/**
 * @swagger
 * /recipes/my-recipes:
 *   get:
 *     summary: Get recipes created by the authenticated user
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: My recipes retrieved successfully
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6644aaddb1105bb28472f920
 *                       title:
 *                         type: string
 *                         example: Ayam Bakar Taliwang
 *                       shortDescription:
 *                         type: string
 *                         example: Resep ayam bakar pedas khas Lombok
 *                       thumbnailAlias:
 *                         type: string
 *                         example: recipes/ayam-bakar-taliwang-1715980976821
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authentication failed or invalid user data
 *       500:
 *         description: Internal server error
 */
recipeRouter.get("/my-recipes", getMyRecipes);

/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Get detailed information of a specific recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe to retrieve
 *     responses:
 *       200:
 *         description: Recipe detail successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe detail successfully retrieved
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6644aaddb1105bb28472f920
 *                     title:
 *                       type: string
 *                       example: Nasi Goreng Kampung
 *                     shortDescription:
 *                       type: string
 *                       example: Nasi goreng pedas dengan rempah khas
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                     instructions:
 *                       type: string
 *                       example: Tumis bumbu, masukkan nasi, aduk rata...
 *                     additionalInfo:
 *                       type: string
 *                       example: Cocok untuk sarapan pagi
 *                     category:
 *                       type: string
 *                       example: Makanan Utama
 *                     thumbnail:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v123456/thumbnail.jpg
 *                     thumbnailAlias:
 *                       type: string
 *                       example: recipes/nasi-goreng-kampung-1715980976821
 *                     userId:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                           example: johndoe
 *                         profilePicAlias:
 *                           type: string
 *                           example: profiles/johndoe-profile-123
 *                     averageRating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *                     totalComments:
 *                       type: integer
 *                       example: 12
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authentication failed or invalid user data
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe not found
 *       500:
 *         description: Internal server error
 */
recipeRouter.get("/:recipeId", getRecipeDetail);

/**
 * @swagger
 * /recipes/my-recipes/{recipeId}:
 *   get:
 *     summary: Get detailed information of the authenticated user's own recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe owned by the authenticated user
 *     responses:
 *       200:
 *         description: My recipe detail fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: My recipe detail fetched successfully
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6644aaddb1105bb28472f920
 *                     title:
 *                       type: string
 *                       example: Ayam Bakar Madu
 *                     shortDescription:
 *                       type: string
 *                       example: Ayam bakar lezat dengan saus madu
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                     instructions:
 *                       type: string
 *                       example: Lumuri ayam, bakar hingga matang...
 *                     additionalInfo:
 *                       type: string
 *                       example: Disajikan dengan lalapan
 *                     category:
 *                       type: string
 *                       example: Makanan Utama
 *                     thumbnail:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v123456/thumbnail.jpg
 *                     thumbnailAlias:
 *                       type: string
 *                       example: recipes/ayam-bakar-madu-1715980976821
 *                     userId:
 *                       type: string
 *                       example: 663f1bdc01fe6f29f2e05c7b
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authentication failed or invalid user data
 *       404:
 *         description: Recipe not found or user unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe not found or user unauthorized
 *       500:
 *         description: Internal server error
 */
recipeRouter.get("/my-recipes/:recipeId", getMyRecipeDetail);

/**
 * @swagger
 * /recipes/my-recipes/{recipeId}:
 *   put:
 *     summary: Update an existing recipe owned by authenticated user
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID to update
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the recipe
 *               shortDescription:
 *                 type: string
 *                 description: Short description of the recipe
 *               ingredients:
 *                 type: string
 *                 description: JSON stringified array of ingredients
 *                 example: '["1 cup sugar", "2 eggs"]'
 *               instructions:
 *                 type: string
 *                 description: Step-by-step cooking instructions
 *               additionalInfo:
 *                 type: string
 *                 description: Additional information about the recipe
 *               category:
 *                 type: string
 *                 description: Recipe category
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Image file for recipe thumbnail
 *     responses:
 *       200:
 *         description: Recipe is updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe is updated successfully
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6644aaddb1105bb28472f920
 *                     title:
 *                       type: string
 *                       example: Ayam Bakar Madu
 *                     shortDescription:
 *                       type: string
 *                       example: Ayam bakar lezat dengan saus madu
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                     instructions:
 *                       type: string
 *                       example: Lumuri ayam, bakar hingga matang...
 *                     additionalInfo:
 *                       type: string
 *                       example: Disajikan dengan lalapan
 *                     category:
 *                       type: string
 *                       example: Makanan Utama
 *                     thumbnail:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v123456/thumbnail.jpg
 *                     thumbnailAlias:
 *                       type: string
 *                       example: recipes/ayam-bakar-madu-1715980976821
 *                     userId:
 *                       type: string
 *                       example: 663f1bdc01fe6f29f2e05c7b
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authentication failed or invalid user data
 *       404:
 *         description: Recipe not found or user unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe not found or user unauthorized
 *       500:
 *         description: Internal server error
 */
recipeRouter.put("/my-recipes/:recipeId", uploadImages, editRecipe);

/**
 * @swagger
 * /recipes/my-recipes/{recipeId}:
 *   delete:
 *     summary: Delete a recipe owned by the authenticated user
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipe to delete
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe deleted successfully
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   description: Deleted recipe data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6644aaddb1105bb28472f920
 *                     title:
 *                       type: string
 *                       example: Ayam Bakar Madu
 *                     shortDescription:
 *                       type: string
 *                       example: Ayam bakar lezat dengan saus madu
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                     instructions:
 *                       type: string
 *                       example: Lumuri ayam, bakar hingga matang...
 *                     additionalInfo:
 *                       type: string
 *                       example: Disajikan dengan lalapan
 *                     category:
 *                       type: string
 *                       example: Makanan Utama
 *                     thumbnail:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v123456/thumbnail.jpg
 *                     thumbnailAlias:
 *                       type: string
 *                       example: recipes/ayam-bakar-madu-1715980976821
 *                     userId:
 *                       type: string
 *                       example: 663f1bdc01fe6f29f2e05c7b
 *       400:
 *         description: recipeId is required but not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: recipeId is required but not provide
 *       401:
 *         description: Unauthorized - user authentication failed or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authentication failed or invalid user data
 *       500:
 *         description: Internal server error
 */
recipeRouter.delete("/my-recipes/:recipeId", deleteRecipe);

/**
 * @swagger
 * /recipes/{recipeId}/like:
 *   patch:
 *     summary: Toggle like/unlike a recipe by the authenticated user
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipe to like or unlike
 *     responses:
 *       200:
 *         description: Like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   description: True if the recipe is now liked, false if unliked
 *                   example: true
 *                 likeCount:
 *                   type: integer
 *                   description: Current total like count of the recipe
 *                   example: 5
 *       401:
 *         description: Unauthorized - user authentication failed or invalid user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authentication failed or invalid user data
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 data:
 *                   type: null
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
recipeRouter.patch("/:recipeId/like", toggleLikeRecipe);

/**
 * @swagger
 * /recipes/{recipeId}/share:
 *   patch:
 *     summary: Increment the share count of a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipe to increment share count
 *     responses:
 *       200:
 *         description: Share count incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shareCount:
 *                   type: integer
 *                   description: Updated share count of the recipe
 *                   example: 10
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Recipe not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
recipeRouter.patch("/:recipeId/share", incrementShareCount);

export default recipeRouter;
