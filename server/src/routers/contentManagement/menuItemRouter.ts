import express from 'express';
import { MenuItemController } from '../../controllers/contentManagement/menuItemController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from '../../validations/contentManagement/menuItemValidation';
import permissionMiddleware from '../../middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';

const menuItemController = container.resolve(MenuItemController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Add), addValidation, menuItemController.add);
router.post('/getAll', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.View), menuItemController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.View), menuItemController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.View), getByIdValidation, menuItemController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Update), updateValidation, menuItemController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Delete), deleteValidation, menuItemController.delete);

export default router;