import dotenv from 'dotenv';
import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../../prisma/generated/client';

dotenv.config();

class Config {
  private static instance: Config;
  
  readonly jwtConfig: {
    secret: string;
    expire: string;
    algorithms: readonly ['HS256'];
  };

  readonly prisma: PrismaClient;

  readonly rolePermissions: Record<string, string[]>;

  readonly swaggerSpec: ReturnType<typeof swaggerJsDoc>;

  readonly isProduction: boolean;

  private constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'

    // JWT Configuration
    this.jwtConfig = {
      secret: process.env.JWT_SECRET || 'your-secret-key',
      expire: process.env.JWT_EXPIRE || '24h',
      algorithms: ['HS256'] as const
    };

    // Database Configuration
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is not set in environment variables");
    }

    const adapter = new PrismaLibSql({
      url: DATABASE_URL
    });

    this.prisma = new PrismaClient({
      adapter
    });

    // Role-based Permissions
    this.rolePermissions = {
      ADMIN: ['read:user', 'create:user', 'update:user', 'delete:user', 'read:users', 'manage:users'],
      MANAGER: ['read:users', 'create:users', 'update:users'],
      USER: ['read:users']
    };

    // Swagger Configuration
    const routesPath = path.resolve(process.cwd(), 'server', 'routes');
    const swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'API Documentation with Swagger UI'
        },
        servers: [
          {
            url: 'http://localhost:3000',
            description: 'Development Server'
          },
          {
            url: 'https://api.example.com',
            description: 'Production Server'
          }
        ],
      },
      apis: [
        `${routesPath}/*.ts`,
        `${routesPath}/**/*.ts`
      ]
    };

    this.swaggerSpec = swaggerJsDoc(swaggerOptions);
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config.getInstance();