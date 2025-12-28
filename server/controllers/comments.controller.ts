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
    const comment = await CommentService.create(input)
    return res.status(201).json(comment)
  }

  /**
   * GET /api/comments?invitationId=uuid
   */
  static async list(req: Request, res: Response) {
    const { slug } = req.params as { slug: string }
    const comments = await CommentService.get(slug)
    return res.json({ message: 'Comments retrieved successfully', results: comments })
  }
}
