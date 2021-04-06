import { Router } from 'express';
import { check } from 'express-validator';
import ctrl from '../controllers/auth.controller';
const router = Router();

router.post(
  '/login',
  [
    check('mail', 'Please enter a valid email')
      .normalizeEmail()
      .isEmail(),
    check(
      'pass',
      'Please enter a password of at least 6 characters'
    ).isLength({
      min: 6,
    }),
  ],
  ctrl.loginUser
);

router.post(
  '/signup',
  [
    check('mail', 'Please enter a valid email')
      .normalizeEmail()
      .isEmail(),
    check(
      'pass',
      'Please enter a password of at least 6 characters'
    ).isLength({
      min: 6,
    }),
  ],
  ctrl.RegisterUser
);

router.post('/verifyUser', ctrl.verifyUser);

export default router;
