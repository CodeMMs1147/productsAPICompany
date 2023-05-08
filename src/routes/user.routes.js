import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authJwt, verifySignUp } from '../middlewares';

// eslint-disable-next-line no-unused-vars
const router = Router();

router.post('/', [
  verifySignUp.checkoutDuplicatedUserNameOrEmail,
], userController.createUser);

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUserById);

router.put('/:userId', [authJwt.verifyToken], userController.updateUserById);

router.delete('/:userId', [authJwt.verifyToken, (authJwt.admin)], userController.deleteUser);

export default router;
