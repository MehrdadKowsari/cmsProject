import express from 'express';
import { PostController } from '../../controllers/contentManagement/postController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/contentManagement/postValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageTypeEnum';

const postController = container.resolve(PostController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Add), addValidation, postController.add);
router.post('/getAll', postController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.View), postController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.View), getByIdValidation, postController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Update), updateValidation, postController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Delete), deleteValidation, postController.delete);

export default router;