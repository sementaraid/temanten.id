import { User } from "../prisma/generated/client"
import { Request } from 'express';

type Role = 'admin' | 'user';

export interface IJWTPayload {
  id: string,
  name: string,
  role: Role,
  iat?: number,
  exp?: number,
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  auth?: IJWTPayload;
}


export type UserResponse = Omit<User, 'password'>;