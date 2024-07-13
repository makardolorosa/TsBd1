import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { HttpStatusCode } from '@/enum/http-status-cose.enum';

export async function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers['authorization'];
  let token = '';
  if (headers && headers.startsWith('Bearer')) {
    token = headers.split(' ')[1];
  }
  if (!token) {
    return res.status(HttpStatusCode.Unauthorised).json();
  }
  verify(token, process.env.SECRET_KEY, (err, _data) => {
    if (err) {
      return res.status(HttpStatusCode.Unauthorised).json();
    }
    next();
  });
}
