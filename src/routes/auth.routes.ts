import { Router } from 'express';
import { check } from 'express-validator';
import ctrl from '../controllers/auth.controller';
const router = Router();

router.post(
  '/login',
  [
    check('mail', 'Porfavor ingrese un email válido')
      .normalizeEmail()
      .isEmail(),
    check(
      'pass',
      'Por favor ingrese una contraseña de 6 carácteres mínimo'
    ).isLength({
      min: 6,
    }),
  ],
  ctrl.loginUser
);

router.post(
  '/signup',
  [
    check('mail', 'Porfavor ingrese un email válido')
      .normalizeEmail()
      .isEmail(),
    check(
      'pass',
      'Por favor ingrese una contraseña de 6 carácteres mínimo'
    ).isLength({
      min: 6,
    }),
  ],
  ctrl.RegisterUser
);

router.post('/verifyUser', ctrl.verifyUser);

export default router;
