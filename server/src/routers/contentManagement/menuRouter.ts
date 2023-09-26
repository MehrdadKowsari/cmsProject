import express from 'express';
import { MenuController } from '../../controllers/contentManagement/menuController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from '../../validations/contentManagement/menuValidation';
import permissionMiddleware from '../../middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';

const menuController = container.resolve(MenuController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Add), addValidation, menuController.add);
router.post('/getAll', menuController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.View), menuController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.View), getByIdValidation, menuController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Update), updateValidation, menuController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.ToggleActive), toggleActiveValidation, menuController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Delete), deleteValidation, menuController.delete);

export default router;