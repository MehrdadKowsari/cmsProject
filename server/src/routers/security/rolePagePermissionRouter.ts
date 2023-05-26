import express from 'express';
import { RolePagePermissionController } from '../../controllers/security/rolePagePermissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/security/rolePagePermissionValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const rolePagePermissionController = container.resolve(RolePagePermissionController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Add), addValidation, rolePagePermissionController.add);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), rolePagePermissionController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), getByIdValidation, rolePagePermissionController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Update), updateValidation, rolePagePermissionController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Delete), deleteValidation, rolePagePermissionController.delete);

export default router;