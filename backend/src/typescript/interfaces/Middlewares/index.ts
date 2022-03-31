import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

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

type ValidateBody = (schema: ObjectSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Response<any, Record<string, any>> | undefined;

export interface IMiddlewares {
  errorHandler: ErrorHandler;
  jwtAuth: JwtAuth;
  parseInProgressQuery: ParseInProgressQuery;
  validateBody: ValidateBody;
}
