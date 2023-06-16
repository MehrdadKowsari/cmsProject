import express from 'express';
import { GalleryController } from '../../controllers/contentManagement/galleryController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/contentManagement/galleryValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageTypeEnum';

const galleryController = container.resolve(GalleryController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.Add), addValidation, galleryController.add);
router.post('/getAll', galleryController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.View), galleryController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.View), getByIdValidation, galleryController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.Update), updateValidation, galleryController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.ToggleActive), toggleActiveValidation, galleryController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.Delete), deleteValidation, galleryController.delete);

export default router;