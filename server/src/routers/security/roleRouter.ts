import express from 'express';
import { RoleController } from '../../controllers/security/roleController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/security/roleValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const roleController = container.resolve(RoleController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Add), addValidation, roleController.add);
router.post('/getAll', roleController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), roleController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), getByIdValidation, roleController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Update), updateValidation, roleController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.ToggleActive), toggleActiveValidation, roleController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Delete), deleteValidation, roleController.delete);

export default router;