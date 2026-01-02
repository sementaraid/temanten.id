import config from '@server/config'
import type { IJWTPayload } from '@shared/types'
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

/**
 * Authentication and authorization guard for route protection
 * 
 * Role hierarchy:
 * - Admin: has all permissions (user + admin permissions)
 * - User: has user-level permissions
 * - Guest: no permissions
 */
export class AuthGuard {
  /**
   * Only allows users who are NOT logged in
   * Redirects authenticated users to their dashboard
   */
  static guestOnly(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token

    if (token) {
      res.redirect('/dashboard')
      return
    }

    next()
  }

  /**
   * Requires user to be logged in
   * Allows both admin and regular users
   * Redirects unauthenticated users to sign-in page
   */
  static requireLogin(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token

    if (!token) {
      res.redirect('/sign-in')
      return
    }

    next()
  }

  /**
   * Redirects user based on their role
   * - Admins go to /dashboard
   * - Users go to /my-invitations/list
   * - Non-authenticated users go to /sign-in
   */
  static redirectByRole(req: Request, res: Response): void {
    const token = req.cookies?.token

    // No token - redirect to login
    if (!token) {
      res.redirect('/sign-in')
      return
    }

    try {
      // Decode token to get user role
      const decoded = jwt.verify(token, config.jwt.secret || 'secret') as IJWTPayload

      // Get user role from token
      const role = decoded.role?.toLowerCase()

      // Redirect based on role
      if (role === 'admin') {
        res.redirect('/dashboard')
        return
      }

      if (role === 'user') {
        res.redirect('/my-invitations/list')
        return
      }

      // Default redirect if role is unknown
      res.redirect('/my-invitations/list')
    } catch (error) {
      // Invalid token - redirect to login
      console.error('Token verification failed:', error)
      res.redirect('/sign-in')
    }
  }

  /**
   * Requires user to be admin
   * Redirects non-admins to their user dashboard
   */
  static requireAdmin(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token

    // No token - redirect to login
    if (!token) {
      res.redirect('/sign-in')
      return
    }

    try {
      // Decode token to verify admin role
      const decoded = jwt.verify(token, config.jwt.secret || 'secret') as IJWTPayload

      const role = decoded.role?.toLowerCase()

      // Check if user is admin
      if (role !== 'admin') {
        res.redirect('/my-invitations/list')
        return
      }

      next()
    } catch (error) {
      // Invalid token - redirect to login
      console.error('Token verification failed:', error)
      res.redirect('/sign-in')
    }
  }

  /**
   * Requires user to be authenticated (admin OR user)
   * Admin users have all permissions that user users have
   * 
   * Allows:
   * - Regular users
   * - Admin users (since they inherit all user permissions)
   * 
   * Redirects:
   * - Non-authenticated users to /sign-in
   */
  static requireUser(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token

    // No token - redirect to login
    if (!token) {
      res.redirect('/sign-in')
      return
    }

    try {
      // Decode token to verify authentication
      const decoded = jwt.verify(token, config.jwt.secret || 'secret') as IJWTPayload
      const role = decoded.role?.toLowerCase()

      // Allow both 'user' and 'admin' roles
      // Admin inherits all user permissions
      if (role === 'user' || role === 'admin') {
        next()
        return
      }

      // Unknown role - redirect to login
      res.redirect('/sign-in')
    } catch (error) {
      // Invalid token - redirect to login
      console.error('Token verification failed:', error)
      res.redirect('/sign-in')
    }
  }
}