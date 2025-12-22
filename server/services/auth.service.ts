// auth.service.ts

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';
import { LoginRequest, UserResponse } from '../../types';

interface AuthPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: UserResponse;
}

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const user = await config.prisma.user.findUnique({
      where: { email: credentials.email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    const { password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword as UserResponse
    };
  }

  private static generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, config.jwtConfig.secret, {
      expiresIn: config.jwtConfig.expire
    });
  }
}