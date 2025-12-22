import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest, LoginRequest } from '../../types';

export class AuthController {
  static async login(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as LoginRequest;

      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      const result = await AuthService.login({ email, password });
      res.status(200).json({ message: 'Login successful', ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      res.status(401).json({ message });
    }
  }
}