import express from 'express';
import { GalleryCategoryController } from '../../controllers/contentManagement/galleryCategoryController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/contentManagement/galleryCategoryValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageTypeEnum';

const galleryCategoryController = container.resolve(GalleryCategoryController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.GalleryCategory, PermissionTypeEnum.Add), addValidation, galleryCategoryController.add);
router.post('/getAll', galleryCategoryController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.GalleryCategory, PermissionTypeEnum.View), galleryCategoryController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.GalleryCategory, PermissionTypeEnum.View), getByIdValidation, galleryCategoryController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.GalleryCategory, PermissionTypeEnum.Update), updateValidation, galleryCategoryController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.GalleryCategory, PermissionTypeEnum.ToggleActive), toggleActiveValidation, galleryCategoryController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.GalleryCategory, PermissionTypeEnum.Delete), deleteValidation, galleryCategoryController.delete);

export default router;