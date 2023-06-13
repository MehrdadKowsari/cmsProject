import express from 'express';
import { PostCategoryController } from '../../controllers/contentManagement/postCategoryController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/contentManagement/postCategoryValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageEnum';

const postCategoryController = container.resolve(PostCategoryController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PostCategory, PermissionTypeEnum.Add), addValidation, postCategoryController.add);
router.post('/getAll', postCategoryController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PostCategory, PermissionTypeEnum.View), postCategoryController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PostCategory, PermissionTypeEnum.View), getByIdValidation, postCategoryController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PostCategory, PermissionTypeEnum.Update), updateValidation, postCategoryController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PostCategory, PermissionTypeEnum.ToggleActive), toggleActiveValidation, postCategoryController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.PostCategory, PermissionTypeEnum.Delete), deleteValidation, postCategoryController.delete);

export default router;