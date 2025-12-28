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
 * /api/comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a new comment
 *     requestBody:
 *       required: true
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
 *     tags:
 *       - Comments
 *     summary: Get comments by invitation ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Invitation ID
 *         schema:
 *           type: string
 *           format: uuid
 */
router.get(
  '/:id',
  validateRequest(getCommentsQuerySchema, 'params'),
  CommentController.list
);

export default router;