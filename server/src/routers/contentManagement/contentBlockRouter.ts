import express from 'express';
import { ContentBlockController } from '../../controllers/contentManagement/contentBlockController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/contentManagement/contentBlockValidation';
import permissionMiddleware from 'src/middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from 'src/enums/security/permissionTypeEnum';
import { PageTypeEnum } from 'src/enums/security/pageTypeEnum';

const contentBlockController = container.resolve(ContentBlockController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.ContentBlock, PermissionTypeEnum.Add), addValidation, contentBlockController.add);
router.post('/getAll', contentBlockController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.ContentBlock, PermissionTypeEnum.View), contentBlockController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.ContentBlock, PermissionTypeEnum.View), getByIdValidation, contentBlockController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.ContentBlock, PermissionTypeEnum.Update), updateValidation, contentBlockController.update);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.ContentBlock, PermissionTypeEnum.Delete), deleteValidation, contentBlockController.delete);

export default router;