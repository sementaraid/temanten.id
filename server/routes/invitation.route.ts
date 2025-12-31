import { Router } from 'express';
import { GuestListController } from '@server/controllers/guest-list.controller';
import { AuthMiddleware } from '@server/middlewares/auth.middleware';

const router = Router();

router.get(
  '/',
  AuthMiddleware.verify,
  GuestListController.list
);

export default router;