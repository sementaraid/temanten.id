import { Response, NextFunction } from 'express';
import config from '../config';
import { AuthRequest } from '../../types';

export const rbacMiddleware = (requiredPermissions: string | string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.auth) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const userRole = req.auth.role;
      const userPermissions = config.rolePermissions[userRole] || [];

      // Normalize requiredPermissions to array
      const required = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      // Check if user has all required permissions
      const hasPermission = required.every(perm => userPermissions.includes(perm));

      if (!hasPermission) {
        res.status(403).json({
          message: 'Akses ditolak. Anda tidak memiliki permission yang diperlukan.',
          required,
          userPermissions
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'RBAC check error' });
    }
  };
};