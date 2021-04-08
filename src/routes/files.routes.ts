import { Router } from 'express';
import { check } from 'express-validator';
import ctrl from '../controllers/files.controller';
const router = Router();

router.post('/getEmployees', ctrl.getEmployees);

router.post('/getSales', ctrl.getSales);

export default router;
