import express from 'express';
import { UserController } from '../controllers/userController';
import {container} from 'tsyringe'; 
import addUserValidation from 'src/validations/userValidation';

const userController = container.resolve(UserController);
const router = express.Router();

router.post('/add', addUserValidation, userController.add);
router.post('/fetchAll', userController.fetchAll);
router.post('/getById', userController.getById);
router.post('/getCurrent', userController.getCurrent);
router.post('/delete', userController.delete);
router.post('/update', userController.update);
router.post('/updateProfile', userController.updateProfile);
router.post('/changePassword', userController.changePassword);
router.post('/resetPassword', userController.resetPassword);
router.post('/toggleActive', userController.toggleActive);

export default router;