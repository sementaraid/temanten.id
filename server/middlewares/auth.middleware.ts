
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import { AuthRequest } from '../../types';
import { AppError } from '../utils/errors';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new AppError('Token tidak ditemukan', 401);
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.auth = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: 'Token tidak valid' });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: 'Token sudah expired' });
    } else if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Authentication error' });
    }
  }
};