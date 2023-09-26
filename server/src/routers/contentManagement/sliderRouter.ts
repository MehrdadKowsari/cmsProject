import express from 'express';
import { SliderController } from '../../controllers/contentManagement/sliderController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from '../../validations/contentManagement/sliderValidation';
import permissionMiddleware from '../../middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';

const sliderController = container.resolve(SliderController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.Add), addValidation, sliderController.add);
router.post('/getAll', sliderController.getAll);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.View), sliderController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.View), getByIdValidation, sliderController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.Update), updateValidation, sliderController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.ToggleActive), toggleActiveValidation, sliderController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.Delete), deleteValidation, sliderController.delete);

export default router;