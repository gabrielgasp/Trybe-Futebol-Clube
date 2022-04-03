import { Request, Response, NextFunction } from 'express';
import { TBodyValidator } from '../../types';

type ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => Response<any, Record<string, any>>;

type JwtAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Response<any, Record<string, any>>;

type ParseInProgressQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

type ValidateBody = (bodyValidator: TBodyValidator) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Response<any, Record<string, any>> | void;

export interface IMiddlewares {
  errorHandler: ErrorHandler;
  jwtAuth: JwtAuth;
  parseInProgressQuery: ParseInProgressQuery;
  validateBody: ValidateBody;
}
