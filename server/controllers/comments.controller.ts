// server/src/controllers/comment.controller.ts
import { Request, Response } from 'express'
import { Comments } from '../../prisma/generated/client'
import { CommentService } from '../services/comments.service'

export class CommentController {
  /**
   * POST /api/comments
   */
  static async create(req: Request, res: Response) {
    const input = req.body as Comments

    // 1️⃣ Business logic
    const comment = await CommentService.create(input)

    // 2️⃣ Realtime emit
    const ws = req.app.get('ws')
    ws?.emitToInvitation(input.id, comment)

    // 3️⃣ Response
    return res.status(201).json(comment)
  }

  /**
   * GET /api/comments?invitationId=uuid
   */
  static async list(req: Request, res: Response) {
    const { invitationId } = req.query as { invitationId: string }

    const comments = await CommentService.get(invitationId)

    return res.json(comments)
  }
}
