import type { Response, Request } from 'express';
import { AuthService } from '@server/services/auth.service';
import { type LoginRequest } from '@shared/types';
import config from '@server/config';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as LoginRequest;

      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      const result = await AuthService.login({ email, password });

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: config.isProduction,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      })
      res.status(200).json({ message: 'Login successful', token: result.token });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      res.status(401).json({ message });
    }
  }

  static async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie('token', {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logout successful' });
  }
}