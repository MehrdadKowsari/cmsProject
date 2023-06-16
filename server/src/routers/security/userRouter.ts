import express from 'express';
import { UserController } from '../../controllers/security/userController';
import {container} from 'tsyringe'; 
import { addValidation, changePasswordValidation, deleteValidation, getByIdValidation, resetPasswordValidation, toggleActiveValidation, updateValidation } from 'src/validations/security/userValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PageTypeEnum } from 'src/enums/security/pageTypeEnum';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';

const userController = container.resolve(UserController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Add), addValidation, userController.add);
router.post('/getAll', userController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), userController.getAllByParams);
router.post('/getById',(req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), getByIdValidation, userController.getById);
router.post('/getCurrent', userController.getCurrent);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Update), updateValidation, userController.update);
router.post('/updateProfile', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.UserProfile, PermissionTypeEnum.Update), updateValidation, userController.updateProfile);
router.post('/changePassword', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.UserProfile, PermissionTypeEnum.Update), changePasswordValidation, userController.changePassword);
router.post('/resetPassword', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Update), resetPasswordValidation, userController.resetPassword);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.ToggleActive), toggleActiveValidation, userController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Update), deleteValidation, userController.delete);

export default router;