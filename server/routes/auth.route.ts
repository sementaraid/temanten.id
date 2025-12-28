import { Router } from 'express';
import { z } from 'zod';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../utils/validate';

const router = Router();
const loginSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .email('Invalid email format')
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post(
  '/login', 
  validateRequest(loginSchema, 'body'), 
  AuthController.login
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - No valid token provided
 *       500:
 *         description: Internal server error
 */
router.post(
  '/logout', 
  AuthController.logout
);

export default router;