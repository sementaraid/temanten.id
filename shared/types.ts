import { type User } from "../prisma/generated/client"

type Role = 'admin' | 'user';

export interface IJWTPayload {
  id: string,
  name: string,
  email: string,
  role: Role,
  iat?: number,
  exp?: number,
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type UserResponse = Omit<User, 'password'>;