import { Router } from 'express';
import { z } from 'zod'
import { RequestValidator } from '@server/utils/validate';
import { GuestResponseController } from '@server/controllers/guest-response.controller';

const router = Router();

const getCommentsQuerySchema = z.object({
  id: z.string()
})

router.get(
  '/:id',
  RequestValidator.validate(getCommentsQuerySchema, 'params'),
  GuestResponseController.list
);

export default router;