import express from 'express';
import { PermissionController } from '../../controllers/security/permissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from '../../validations/security/permissionValidation';
import permissionMiddleware from '../../middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';

const permissionController = container.resolve(PermissionController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Permission, PermissionTypeEnum.Add), addValidation, permissionController.add);
router.post('/getAll', permissionController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Permission, PermissionTypeEnum.View), permissionController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Permission, PermissionTypeEnum.View), getByIdValidation, permissionController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Permission, PermissionTypeEnum.Update), updateValidation, permissionController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Permission, PermissionTypeEnum.ToggleActive), toggleActiveValidation, permissionController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Permission, PermissionTypeEnum.Delete), deleteValidation, permissionController.delete);

export default router;