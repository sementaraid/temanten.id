import type { Request, Response, NextFunction } from 'express'
import z from 'zod'

type ValidateTarget = 'body' | 'query' | 'params'

export class RequestValidator {
  static validate(
    schema: z.ZodSchema,
    target: ValidateTarget = 'body'
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next): void => {
      const data = req[target]

      const result = schema.safeParse(data)

      if (!result.success) {
        res.status(400).json({
          error: 'Validation error',
          issues: result.error.format(),
        })
        return
      }

      // overwrite with parsed & sanitized data
      req[target] = result.data as any
      next()
    }
  }
}
