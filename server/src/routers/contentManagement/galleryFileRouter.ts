import express from 'express';
import { GalleryFileController } from '../../controllers/contentManagement/galleryFileController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/contentManagement/galleryFileValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const galleryFileController = container.resolve(GalleryFileController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.Add), addValidation, galleryFileController.add);
router.post('/getAll', galleryFileController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.View), galleryFileController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.View), getByIdValidation, galleryFileController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.Update), updateValidation, galleryFileController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Gallery, PermissionTypeEnum.Delete), deleteValidation, galleryFileController.delete);

export default router;