import express from 'express';
import { PagePermissionController } from '../../controllers/security/pagePermissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from '../../validations/security/pagePermissionValidation';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import permissionMiddleware from '../../middleware/shared/permissionMiddleware';

const pagePermissionController = container.resolve(PagePermissionController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PagePermission, PermissionTypeEnum.Add), addValidation, pagePermissionController.add);
router.post('/getAll', pagePermissionController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PagePermission, PermissionTypeEnum.View), pagePermissionController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PagePermission, PermissionTypeEnum.View), getByIdValidation, pagePermissionController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PagePermission, PermissionTypeEnum.Update), updateValidation, pagePermissionController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PagePermission, PermissionTypeEnum.Delete), deleteValidation, pagePermissionController.delete);

export default router;