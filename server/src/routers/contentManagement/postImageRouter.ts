import express from 'express';
import { PostImageController } from '../../controllers/contentManagement/postImageController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from '../../validations/contentManagement/postImageValidation';
import permissionMiddleware from '../../middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';

const postImageController = container.resolve(PostImageController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Add), addValidation, postImageController.add);
router.post('/getAll', postImageController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.View), postImageController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.View), getByIdValidation, postImageController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Update), updateValidation, postImageController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Delete), deleteValidation, postImageController.delete);

export default router;