import express from 'express';
import { RelatedPostController } from '../../controllers/contentManagement/relatedPostController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/contentManagement/relatedPostValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageTypeEnum';

const relatedPostController = container.resolve(RelatedPostController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Add), addValidation, relatedPostController.add);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.View), relatedPostController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.View), getByIdValidation, relatedPostController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Update), updateValidation, relatedPostController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Delete), deleteValidation, relatedPostController.delete);

export default router;