import express from 'express';
import { TagController } from '../../controllers/contentManagement/tagController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/contentManagement/tagValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const tagController = container.resolve(TagController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Tag, PermissionTypeEnum.Add), addValidation, tagController.add);
router.post('/getAll', tagController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Tag, PermissionTypeEnum.View), tagController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Tag, PermissionTypeEnum.View), getByIdValidation, tagController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Tag, PermissionTypeEnum.Update), updateValidation, tagController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Tag, PermissionTypeEnum.ToggleActive), toggleActiveValidation, tagController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Tag, PermissionTypeEnum.Delete), deleteValidation, tagController.delete);

export default router;