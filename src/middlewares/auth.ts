import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserToken } from '../interfaces';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const t = req.header('x-auth-token');
    if (!t) {
      return res.status(400).json({ msg: 'unauthorized' });
    }

    const token: UserToken = jwt.verify(
      t,
      process.env.SECRET_KEY!
    ) as UserToken;

    req.token = token;

    next();
  } catch (e) {
    return res.status(400).json({ msg: 'unauthorized' });
  }
};
