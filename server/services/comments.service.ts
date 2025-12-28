// server/src/services/comment.service.ts

import config from '../config';
import { type Comments } from "../../prisma/generated/client"

export class CommentService {
  static async create(input: Comments) {
    return config.prisma.comments.create({
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

  static async get(id: string){
    return config.prisma.comments.findUnique({
      where: {
        id: id
      }
    })
  }
}
