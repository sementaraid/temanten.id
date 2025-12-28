import { Request, Response, NextFunction } from "express";

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (token) return res.redirect('/dashboard');
  next();
};

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/sign-in');
  next();
};

export { authGuard, requireLogin };