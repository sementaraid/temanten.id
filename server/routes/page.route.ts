import { Router, type Request, type Response, type NextFunction } from 'express';
import { AuthGuard } from '@server/middlewares/page.middleware';

const router = Router();

// Sign-in page - with auth guard
router.get(
  '/sign-in', 
  AuthGuard.guestOnly, 
  (_req: Request, _res: Response, next: NextFunction) => next()
);

// Register page - with auth guard
router.get(
  '/register', 
  AuthGuard.guestOnly, 
  (_req: Request, _res: Response, next: NextFunction) => next()
);

// Dashboard page - requires login
router.get(
  '/dashboard', 
  AuthGuard.requireLogin, 
  (_req: Request, _res: Response, next: NextFunction) => next()
);

export default router;