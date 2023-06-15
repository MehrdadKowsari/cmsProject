import express from 'express';
import { MenuItemController } from '../../controllers/contentManagement/menuItemController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/contentManagement/menuItemValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const menuItemController = container.resolve(MenuItemController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Add), addValidation, menuItemController.add);
router.post('/getAll', menuItemController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.View), menuItemController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.View), getByIdValidation, menuItemController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Update), updateValidation, menuItemController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Menu, PermissionTypeEnum.Delete), deleteValidation, menuItemController.delete);

export default router;