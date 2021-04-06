import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session.token;

  if (!token) {
    return res.status(404).json({
      error: true,
      msg: 'unauthorized',
    });
  }
};
