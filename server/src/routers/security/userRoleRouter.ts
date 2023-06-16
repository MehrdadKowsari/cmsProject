import express from 'express';
import { UserRoleController } from '../../controllers/security/userRoleController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/security/userRoleValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageTypeEnum';

const userRoleController = container.resolve(UserRoleController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.UserRole, PermissionTypeEnum.Add), addValidation, userRoleController.add);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.UserRole, PermissionTypeEnum.View), userRoleController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.UserRole, PermissionTypeEnum.View), getByIdValidation, userRoleController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.UserRole, PermissionTypeEnum.Update), updateValidation, userRoleController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.UserRole, PermissionTypeEnum.Delete), deleteValidation, userRoleController.delete);

export default router;