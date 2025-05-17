import express from "express";
import {
  createComment,
  getAllComment,
  replyToComment,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints related to comments in website
 */

/**
 * @swagger
 * /comments/{recipeId}:
 *   post:
 *     summary: Create a new comment and rating for a recipe
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipe to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - commentText
 *               - rating
 *             properties:
 *               commentText:
 *                 type: string
 *                 example: Resep ini enak sekali!
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image for the comment
 *     responses:
 *       201:
 *         description: Comment successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New comment is successfully created
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6652fd08e0e7a2e2a9b3cc1e
 *                     userId:
 *                       type: string
 *                     recipeId:
 *                       type: string
 *                     commentText:
 *                       type: string
 *                     rating:
 *                       type: integer
 *                       example: 5
 *                     image:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please fill all required fields
 *       401:
 *         description: Unauthorized (missing or invalid token)
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
commentRouter.post("/:recipeId", createComment);

/**
 * @swagger
 * /comments/{recipeId}:
 *   get:
 *     summary: Get all comments along with user info and replies
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Successfully fetched all comments with replies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userName:
 *                         type: string
 *                         example: John Doe
 *                       profilePic:
 *                         type: string
 *                         example: https://res.cloudinary.com/.../profile.jpg
 *                       commentText:
 *                         type: string
 *                         example: Resepnya enak banget!
 *                       rating:
 *                         type: integer
 *                         example: 5
 *                       replies:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             commentText:
 *                               type: string
 *                               example: Terima kasih!
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: 2024-04-10T10:30:00Z
 *                             userName:
 *                               type: string
 *                               example: Jane Reply
 *                             profilePic:
 *                               type: string
 *                               example: https://res.cloudinary.com/.../reply-user.jpg
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
commentRouter.get("/:recipeId", getAllComment);

/**
 * @swagger
 * /comments/{commentId}/reply:
 *   post:
 *     summary: Reply to a specific comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to reply to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentText
 *             properties:
 *               commentText:
 *                 type: string
 *                 example: Terima kasih atas resepnya!
 *     responses:
 *       201:
 *         description: Reply is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reply is successfully created
 *       400:
 *         description: Missing comment text
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please fill all required fields
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */
commentRouter.post("/:commentId/reply", replyToComment);

export default commentRouter;
