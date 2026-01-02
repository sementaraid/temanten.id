import type { Request, Response } from 'express'
import { type GuestList } from '@database/generated/client'
import { GuestListService } from '@server/services/guest-list.service'

export class GuestListController {
  static async create(req: Request, res: Response) {
    const input = req.body as GuestList
    const guest_list = await GuestListService.create(input)
    return res.status(201).json(guest_list)
  }

  static async list(req: Request, res: Response) {
    const { slug } = req.params as { slug: string }
    const guest_list = await GuestListService.get(slug)
    return res.json({ message: 'Guest list retrieved successfully', results: guest_list })
  }
}
