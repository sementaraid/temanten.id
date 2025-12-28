import { Router, Request, Response, NextFunction } from 'express';
import { authGuard, requireLogin } from '../middlewares/page.middleware';
import { z } from 'zod'
import { validateRequest } from '../utils/validate';
import { CommentController } from '../controllers/comments.controller';

const router = Router();

const createCommentSchema = z.object({
  invitationId: z.string().uuid(),
  author: z
    .string()
    .min(1)
    .max(50),
  message: z
    .string()
    .min(1)
    .max(1000)
})

const getCommentsQuerySchema = z.object({
  id: z.string()
})
/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         invitationId:
 *           type: string
 *           format: uuid
 *         author:
 *           type: string
 *           example: "John Doe"
 *         message:
 *           type: string
 *           example: "Congratulations!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     CreateCommentRequest:
 *       type: object
 *       required:
 *         - invitationId
 *         - author
 *         - message
 *       properties:
 *         invitationId:
 *           type: string
 *           format: uuid
 *         author:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *         message:
 *           type: string
 *           minLength: 1
 *           maxLength: 1000
 */

/**
 * @openapi
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentRequest'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation error
 */
router.post(
  '/',
  validateRequest(createCommentSchema, 'body'),
  CommentController.create
);

/**
 * @openapi
 * /api/comments/{id}:
 *   get:
 *     summary: Get comments by invitation ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Invitation ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation error
 */
router.get(
  '/:id',
  validateRequest(getCommentsQuerySchema, 'params'),
  CommentController.list
);

export default router;