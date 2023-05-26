import express from 'express';
import { PageController } from '../../controllers/security/pageController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, toggleHiddenValidation, updateValidation } from 'src/validations/security/pageValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const pageController = container.resolve(PageController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Add), addValidation, pageController.add);
router.post('/getAll', pageController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), pageController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.View), getByIdValidation, pageController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Update), updateValidation, pageController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.ToggleActive), toggleActiveValidation, pageController.toggleActive);
router.post('/toggleHidden', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Update), toggleHiddenValidation, pageController.toggleHidden);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.User, PermissionTypeEnum.Delete), deleteValidation, pageController.delete);

export default router;