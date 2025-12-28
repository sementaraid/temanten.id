import { Router, Request, Response, NextFunction } from 'express';
import { authGuard, requireLogin } from '../middlewares/page.middleware';

const router = Router();

// Sign-in page - with auth guard
router.get(
  '/sign-in', authGuard, (_req: Request, _res: Response, next: NextFunction) => {
  next();
});

// Register page - with auth guard
router.get('/register', authGuard, (_req: Request, _res: Response, next: NextFunction) => {
  next();
});

// Dashboard page - requires login
router.get('/dashboard', requireLogin, (_req: Request, _res: Response, next: NextFunction) => {
  next();
});

export default router;