import express from 'express';
import { getRefreshToken, signIn, signInByGoogle, signUp } from '../controllers/authController'

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signInByGoogle', signInByGoogle);
router.post('/signUp', signUp);
router.post('/getRefreshToken', getRefreshToken);

export default router;