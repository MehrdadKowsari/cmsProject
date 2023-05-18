import express from 'express';
import { UserController } from '../../controllers/security/userController';
import {container} from 'tsyringe'; 
import { addValidation, changePasswordValidation, deleteValidation, getByIdValidation, resetPasswordValidation, toggleActiveValidation, updateValidation } from 'src/validations/security/userValidation';

const userController = container.resolve(UserController);
const router = express.Router();

router.post('/add', addValidation, userController.add);
router.post('/getAll', userController.getAll);
router.post('/getAllByParams', userController.getAllByParams);
router.post('/getById', getByIdValidation, userController.getById);
router.post('/getCurrent', userController.getCurrent);
router.post('/update', updateValidation, userController.update);
router.post('/updateProfile', updateValidation, userController.updateProfile);
router.post('/changePassword', changePasswordValidation, userController.changePassword);
router.post('/resetPassword', resetPasswordValidation, userController.resetPassword);
router.post('/toggleActive', toggleActiveValidation, userController.toggleActive);
router.post('/delete', deleteValidation, userController.delete);

export default router;