import config from '@server/config';
import { type GuestResponses } from "@database/generated/client"

export class GuestResponseService {
  static async create(input: GuestResponses) {
    return config.prisma.guestResponses.create({
      data: {
        id: input.id,
        slug: input.slug,
        name: input.name,
        message: input.message,
        confirmation: input.confirmation,
        createdAt: new Date(),
      }
    })
  }

  static async get(slug: string){
    return config.prisma.guestResponses.findMany({
      where: {
        slug: slug
      }
    })
  }
}
