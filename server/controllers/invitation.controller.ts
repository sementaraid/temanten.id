import type { Request, Response } from 'express'
import { type Invitation } from '@database/generated/client'
import { InvitationService } from '@server/services/invitation.service'

export class InvitationController {
  static async create(req: Request, res: Response) {
    const input = req.body as Invitation
    const invitation = await InvitationService.create(input)
    return res.status(201).json(invitation)
  }

  static async list(req: Request, res: Response) {
    const { slug } = req.params as { slug: string }
    const invitation = await InvitationService.get(slug)
    return res.json({ message: 'Invitation retrieved successfully', results: invitation })
  }
}
