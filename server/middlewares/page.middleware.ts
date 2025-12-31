import type { Request, Response, NextFunction } from 'express'

export class AuthGuard {
  static guestOnly(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token

    if (token) {
      res.redirect('/dashboard')
      return
    }

    next()
  }

  static requireLogin(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token

    if (!token) {
      res.redirect('/sign-in')
      return
    }

    next()
  }
}
