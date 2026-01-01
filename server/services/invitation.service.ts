import config from '@server/config';
import { type Invitation } from "@database/generated/client"

export class InvitationService {
  static async create(input: Invitation) {
    return config.prisma.invitation.create({
      data: {
        id: input.id,
        slug: input.slug,
        title: input.title,
        author: input.author,
        message: input.message,
        templateId: input.templateId,
        brideFullName: input.brideFullName,
        brideNickname: input.brideNickname,
        brideBirthOrder: input.brideBirthOrder,
        brideFather: input.brideFather,
        brideMother: input.brideMother,
        brideInstagram: input.brideInstagram,
        groomFullName: input.groomFullName,
        groomNickname: input.groomNickname,
        groomBirthOrder: input.groomBirthOrder,
        groomFather: input.groomFather,
        groomMother: input.groomMother,
        groomInstagram: input.groomInstagram,
        ceremonyName: input.ceremonyName,
        ceremonyDate: input.ceremonyDate,
        ceremonyTime: input.ceremonyTime,
        ceremonyLocationName: input.ceremonyLocationName,
        ceremonyAddress: input.ceremonyAddress,
        ceremonyMapsUrl: input.ceremonyMapsUrl,
        receptionName: input.receptionName,
        receptionDate: input.receptionDate,
        receptionTime: input.receptionTime,
        receptionLocationName: input.receptionLocationName,
        receptionAddress: input.receptionAddress,
        receptionMapsUrl: input.receptionMapsUrl,
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
