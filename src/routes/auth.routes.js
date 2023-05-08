import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { verifySignUp } from '../middlewares';

const router = Router();

router.post('/signIn', authController.signIn);

router.post('/signUp', [verifySignUp.checkoutDuplicatedUserNameOrEmail, verifySignUp.checkRolesExisted], authController.signUp);

export default router;
