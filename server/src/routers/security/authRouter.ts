import express from 'express';
import AuthController from '../../controllers/security/authController'
import { container } from 'tsyringe';
import { signInByGoogleValidation, signInValidation, signUpValidation } from 'src/validations/security/authValidation';

const authController = container.resolve(AuthController);
const router = express.Router();

router.post('/signIn', signInValidation, authController.signIn);
router.post('/signInByGoogle', signInByGoogleValidation, authController.signInByGoogle);
router.post('/signUp', signUpValidation, authController.signUp);
router.post('/getRefreshToken', authController.getRefreshToken);

export default router;