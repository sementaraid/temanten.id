import config from '@server/config';
import { type Invitation } from "@database/generated/client"

export class InvitationService {
  static async create(input: Invitation) {
    return config.prisma.invitation.create({
      data: {
        id: input.id,
        slug: input.slug,
        title: input.title,
      }
    })
  }

  static async get(slug: string){
    return config.prisma.invitation.findMany({
      where: {
        slug: slug
      }
    })
  }
}
