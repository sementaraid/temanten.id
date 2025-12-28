import { Router } from 'express';
import { z } from 'zod';
import { AuthController } from '../controllers/auth.controller';

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

const validateRequest = (schema: z.ZodSchema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = JSON.parse(error.message).map((err) => err.message);

        return res.status(400).json({
          error: 'Validation error',
          issues: messages,
        });
      }
      next(error);
    }
  };
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login pengguna
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
  '/login', 
  validateRequest(loginSchema), 
  AuthController.login
);

export default router;