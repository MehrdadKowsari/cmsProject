import express from 'express';
import AuthController from '../controllers/authController'
import { container } from 'tsyringe';

const authController = container.resolve(AuthController);
const router = express.Router();

router.post('/signIn', authController.signIn);
router.post('/signInByGoogle', authController.signInByGoogle);
router.post('/signUp', authController.signUp);
router.post('/getRefreshToken', authController.getRefreshToken);

export default router;