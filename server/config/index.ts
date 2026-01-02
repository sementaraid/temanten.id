import dotenv from 'dotenv'
import path from 'path'
import swaggerJsDoc from 'swagger-jsdoc'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import type { SignOptions, Algorithm } from 'jsonwebtoken'
import { PrismaClient } from '@database/generated/client'

dotenv.config()

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type JwtConfig = {
  secret: string
  expiresIn: SignOptions['expiresIn']
  algorithm: Algorithm
}

type RolePermissions = Record<string, string[]>

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

class Config {
  private static instance: Config

  /* ------------------------------- ENV FLAGS ------------------------------ */
  readonly isProduction: boolean

  /* ------------------------------- SECURITY -------------------------------- */
  readonly jwt: JwtConfig
  readonly rolePermissions: RolePermissions

  /* ------------------------------- DATABASE -------------------------------- */
  readonly prisma: PrismaClient

  /* ------------------------------- SWAGGER --------------------------------- */
  readonly swaggerSpec: ReturnType<typeof swaggerJsDoc>

  private constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'

    this.jwt = this.initJwtConfig()
    this.prisma = this.initPrisma()
    this.rolePermissions = this.initRolePermissions()
    this.swaggerSpec = this.initSwagger()
  }

  /* ------------------------------------------------------------------------ */
  /*                               INITIALIZERS                               */
  /* ------------------------------------------------------------------------ */
  private initJwtConfig(): JwtConfig {
    return {
      secret: process.env.JWT_SECRET ?? 'your-secret-key',
      expiresIn: '24Hr',
      algorithm: 'HS256'
    }
  }

  private initPrisma(): PrismaClient {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set in environment variables')
    }

    const adapter = new PrismaLibSql({
      url: databaseUrl
    })

    return new PrismaClient({ adapter })
  }

  private initRolePermissions(): RolePermissions {
    return {
      ADMIN: [
        'read:user',
        'create:user',
        'update:user',
        'delete:user',
        'read:users',
        'manage:users'
      ],
      MANAGER: [
        'read:users',
        'create:users',
        'update:users'
      ],
      USER: [
        'read:users'
      ]
    }
  }

  private initSwagger() {
    const routesPath = path.resolve(process.cwd(), 'server', 'routes')

    return swaggerJsDoc({
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
        ]
      },
      apis: [
        `${routesPath}/*.ts`,
        `${routesPath}/**/*.ts`
      ]
    })
  }

  /* ------------------------------------------------------------------------ */
  /*                               SINGLETON                                  */
  /* ------------------------------------------------------------------------ */

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config()
    }
    return Config.instance
  }
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export default Config.getInstance()
