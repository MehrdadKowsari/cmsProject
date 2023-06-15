import express from 'express';
import { PostCommentController } from '../../controllers/contentManagement/postCommentController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/contentManagement/postCommentValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const postCommentController = container.resolve(PostCommentController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Add), addValidation, postCommentController.add);
router.post('/getAll', postCommentController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.View), postCommentController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.View), getByIdValidation, postCommentController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Update), updateValidation, postCommentController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Post, PermissionTypeEnum.Delete), deleteValidation, postCommentController.delete);

export default router;