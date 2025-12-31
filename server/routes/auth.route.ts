import { Router } from 'express';
import { createSessionSchema } from '@shared/schema'
import { AuthController } from '@server/controllers/auth.controller';
import { RequestValidator } from '@server/utils/validate';

const router = Router();

/**
 * @openapi
 * /api/auth/sign-in:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in user
 *     description: Authenticate user and create a session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     email:
 *                       type: string
 *                       example: user@email.com
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post(
  '/sign-in',
  RequestValidator.validate(createSessionSchema, 'body'),
  AuthController.login
);

/**
 * @openapi
 * /api/auth/sign-out:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign out user
 *     description: Destroy user session
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post(
  '/sign-out',
  AuthController.logout
);

export default router;
