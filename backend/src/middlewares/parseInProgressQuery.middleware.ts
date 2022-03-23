import { NextFunction, Request, Response } from 'express';

export const parseInProgressQuery = async (req: Request, _res: Response, next: NextFunction) => {
  const { inProgress } = req.query;

  let inProgBool: boolean | undefined;

  if (inProgress === 'true') inProgBool = true;
  if (inProgress === 'false') inProgBool = false;

  req.body.inProgress = inProgBool;

  next();
};
