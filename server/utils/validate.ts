import type { Request, Response, NextFunction } from "express";
import z from "zod";

type ValidateTarget = 'body' | 'query' | 'params'

const validateRequest = (schema: z.ZodSchema, target: ValidateTarget = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req[target]

    const result = schema.safeParse(data)

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation error',
        issues: result.error.format()
      })
    }

    req[target] = result.data as any
    next()
  }

export { validateRequest }