import type { Response, NextFunction } from 'express'
import config from '@server/config'
import type { AuthRequest } from '@shared/types'

export class RBACMiddleware {
  static allow(requiredPermissions: string | string[]): (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => void {
    return (req, res, next): void => {
      try {
        if (!req.auth) {
          res.status(401).json({ message: 'User not authenticated' })
          return
        }

        const userRole = req.auth.role
        const userPermissions = config.rolePermissions[userRole] ?? []

        const required = Array.isArray(requiredPermissions)
          ? requiredPermissions
          : [requiredPermissions]

        const hasPermission = required.every(permission =>
          userPermissions.includes(permission)
        )

        if (!hasPermission) {
          res.status(403).json({
            message: 'Akses ditolak. Anda tidak memiliki permission yang diperlukan.',
            required,
            userPermissions,
          })
          return
        }

        next()
      } catch {
        res.status(500).json({ message: 'RBAC check error' })
      }
    }
  }
}
