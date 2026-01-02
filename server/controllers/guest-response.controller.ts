import type { Request, Response } from 'express'
import { type GuestResponses } from '@database/generated/client'
import { GuestResponseService } from '@server/services/guest-response.service'

export class GuestResponseController {
  static async create(req: Request, res: Response) {
    const input = req.body as GuestResponses
    const guest_response = await GuestResponseService.create(input)
    return res.status(201).json(guest_response)
  }

  static async list(req: Request, res: Response) {
    const { slug } = req.params as { slug: string }
    const guest_responses = await GuestResponseService.get(slug)
    return res.json({ message: 'Guest responses retrieved successfully', results: guest_responses })
  }
}
