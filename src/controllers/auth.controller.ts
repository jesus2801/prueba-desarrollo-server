import { Request, Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import helpers from '../helpers/functions';

import jwt from 'jsonwebtoken';

export default {
  loginUser: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { mail, pass } = req.body;

    const repository = getRepository(User);

    try {
      const user = await repository.findOne({ mail });

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Lo sentimos, correo y/o contraseña incorrectos',
            },
          ],
        });
      }

      const isValidPass = await helpers.comparePass(pass, user.pass);

      if (!isValidPass) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Lo sentimos, correo y/o contraseña incorrectos',
            },
          ],
        });
      }

      const info = {
        sub: user.userID,
        mail: user.mail,
      };

      const token = jwt.sign(info, process.env.SECRET_KEY!);

      res.json({
        token,
      });
    } catch (e) {
      next(e);
    }
  },

  RegisterUser: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { mail, pass } = req.body;

    const repository = getRepository(User);
    const user = new User();

    const hash = await helpers.hashPass(pass);

    user.mail = mail;
    user.pass = hash;

    try {
      const insertUser = await repository.save(user);

      const info = {
        sub: insertUser.userID,
        mail: insertUser.mail,
      };

      const token = jwt.sign(info, process.env.SECRET_KEY!);

      res.json({
        token,
      });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
          errors: [
            {
              msg:
                'El correo ingresado ya está seleccionado por otro usuario',
            },
          ],
        });
      }
      next(e);
    }
  },

  verifyUser: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const t = req.header('x-auth-token');
    if (!t) {
      return res.send(false);
    }
    try {
      jwt.verify(t!, process.env.SECRET_KEY!);
      res.send(true);
    } catch (e) {
      res.send(false);
    }
  },
};
