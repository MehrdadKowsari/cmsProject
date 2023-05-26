import express from 'express';
import { PermissionController } from '../../controllers/security/permissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/security/permissionValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const permissionController = container.resolve(PermissionController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Add), addValidation, permissionController.add);
router.post('/getAll', permissionController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), permissionController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), getByIdValidation, permissionController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Update), updateValidation, permissionController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.ToggleActive), toggleActiveValidation, permissionController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Delete), deleteValidation, permissionController.delete);

export default router;