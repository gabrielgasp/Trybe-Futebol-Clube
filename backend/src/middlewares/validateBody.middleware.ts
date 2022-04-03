import { NextFunction, Request, Response } from 'express';
import { TBodyValidator } from '../typescript/types';

export const validateBody = (bodyValidator: TBodyValidator) => (
  (req: Request, res: Response, next: NextFunction) => {
    const error = bodyValidator(req.body);

    if (error) {
      return res.status(error.code).json({ message: error.message });
    }

    return next();
  }
);
