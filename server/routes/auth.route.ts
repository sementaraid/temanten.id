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
 * /api/auth:
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
 *         description: Login berhasil
 */
router.post(
  '/', 
  validateRequest(loginSchema, 'body'), 
  AuthController.login
);

export default router;