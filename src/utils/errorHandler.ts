import {NextFunction, Request, Response} from 'express';
import {AppError} from './appErrors';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({status: 'error', message: err.message || 'Request error'});

    return;
  }

  // Catch errors caused by express.json() when malformed json body is encountered
  if (err.type === 'entity.parse.failed') {
    res.status(400).json({message: 'Malformed body'});
  }

  console.log(err);
  res.status(500).json({message: 'Unexpected server error'});

  return;
};
