import express from 'express';
import { RolePagePermissionController } from '../../controllers/security/rolePagePermissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/security/rolePagePermissionValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const rolePagePermissionController = container.resolve(RolePagePermissionController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.RolePagePermission, PermissionTypeEnum.Add), addValidation, rolePagePermissionController.add);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.RolePagePermission, PermissionTypeEnum.View), rolePagePermissionController.getAllByParams);
router.post('/getAllByPageId', rolePagePermissionController.getAllByPageId);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.RolePagePermission, PermissionTypeEnum.View), getByIdValidation, rolePagePermissionController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.RolePagePermission, PermissionTypeEnum.Update), updateValidation, rolePagePermissionController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.RolePagePermission, PermissionTypeEnum.Delete), deleteValidation, rolePagePermissionController.delete);

export default router;