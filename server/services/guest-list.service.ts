// server/src/services/comment.service.ts

import config from '@server/config';
import { type GuestList } from "@database/generated/client"

export class GuestListService {
  static async create(input: GuestList) {
    return config.prisma.guestList.create({
      data: {
        id: input.id,
        slug: input.slug,
        name: input.name,
        message: input.message,
        created_at: new Date(),
        phone: input.phone,
        whatsapp: input.whatsapp
      }
    })
  }

  static async get(slug: string){
    return config.prisma.guestList.findMany({
      where: {
        slug: slug
      }
    })
  }
}
