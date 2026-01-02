import { Router, type Request, type Response, type NextFunction } from 'express'
import { AuthGuard } from '@server/middlewares/page.middleware'

const router = Router()

/**
 * Authentication Routes
 * Only accessible to guests (non-authenticated users)
 */

// Sign-in page - for guests only
router.get(
  '/sign-in',
  AuthGuard.guestOnly,
  (_req: Request, _res: Response, next: NextFunction) => next()
)

// Register page - for guests only
router.get(
  '/register',
  AuthGuard.guestOnly,
  (_req: Request, _res: Response, next: NextFunction) => next()
)

/**
 * Admin Routes
 * Only accessible to admin users
 */

// Admin dashboard
router.get(
  '/dashboard',
  AuthGuard.requireAdmin,
  (_req: Request, _res: Response, next: NextFunction) => next()
)

/**
 * User Routes (accessible to both regular users AND admins)
 * Admin users inherit all user permissions
 */

// User invitations list
router.get(
  '/my-invitations/list',
  AuthGuard.requireUser,
  (_req: Request, _res: Response, next: NextFunction) => next()
)

// Create invitation
router.get(
  '/my-invitations/create',
  AuthGuard.requireUser,
  (_req: Request, _res: Response, next: NextFunction) => next()
)

// Invitation builder
router.get(
  '/my-invitations/builder',
  AuthGuard.requireUser,
  (_req: Request, _res: Response, next: NextFunction) => next()
)

// Invitation guests
router.get(
  '/my-invitations/guests',
  AuthGuard.requireUser,
  (_req: Request, _res: Response, next: NextFunction) => next()
)

// Invitation guest messages
router.get(
  '/my-invitations/guests-messages',
  AuthGuard.requireUser,
  (_req: Request, _res: Response, next: NextFunction) => next()
)

/**
 * Catch-all route for authenticated users
 * Redirects to appropriate dashboard based on role
 */
router.get(
  '/',
  (_req: Request, _res: Response, next: NextFunction) => next()
)

export default router