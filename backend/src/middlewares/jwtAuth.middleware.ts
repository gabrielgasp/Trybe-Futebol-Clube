import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const SECRET = process.env.JWT_SECRET || 'a_really_bad_secret';

    const { id, email, role, username } = jwt.verify(token, SECRET) as jwt.JwtPayload;

    req.tokenData = { id, email, role, username };
    return next();
  } catch (e: unknown) {
    if (e instanceof Error && e.name.includes('Token')) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return next(e);
  }
};
