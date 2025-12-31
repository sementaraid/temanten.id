import { Router } from 'express';
import { GuestResponseController } from '@server/controllers/guest-response.controller';

const router = Router();

router.get(
  '/:id',
  GuestResponseController.list
);

export default router;