import { type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import config from '@server/config'
import { type AuthRequest } from '@shared/types'
import { AppError } from '@server/utils/errors'

export class AuthMiddleware {
  static verify(req: AuthRequest, res: Response, next: NextFunction): void {
    try {
      const token = AuthMiddleware.extractToken(req)

      if (!token) {
        throw new AppError('Token tidak ditemukan', 401)
      }

      const decoded = jwt.verify(token, config.jwt.secret)
      if(!decoded) throw decoded
      next()
    } catch (error) {
      AuthMiddleware.handleError(error, res)
    }
  }

  /**
   * Extract JWT from:
   * 1. Authorization: Bearer <token>
   * 2. Cookie: token
   */
  private static extractToken(req: AuthRequest): string | null {
    const authHeader = req.headers.authorization
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]
    }

    const cookieToken = req.cookies?.token
    if (cookieToken) {
      return cookieToken
    }

    return null
  }

  private static handleError(error: unknown, res: Response): void {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: 'Token sudah expired' })
      return
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: 'Token tidak valid' })
      return
    }

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Authentication error' })
  }
}
