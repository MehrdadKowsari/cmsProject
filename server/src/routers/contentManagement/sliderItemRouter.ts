import express from 'express';
import { SliderItemController } from '../../controllers/contentManagement/sliderItemController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from '../../validations/contentManagement/sliderItemValidation';
import permissionMiddleware from '../../middleware/shared/permissionMiddleware';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';

const sliderItemController = container.resolve(SliderItemController);
const router = express.Router();

router.post('/add', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.Add), addValidation, sliderItemController.add);
router.post('/getAllActiveSlidersByParams', sliderItemController.getAllActiveSlidersByParams);
router.post('/getAllByParams', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.View), sliderItemController.getAllByParams);
router.post('/getById', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.View), getByIdValidation, sliderItemController.getById);
router.post('/update', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.Update), updateValidation, sliderItemController.update);
router.post('/toggleActive', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.ToggleActive), toggleActiveValidation, sliderItemController.toggleActive);
router.post('/delete', (req, res, next) => permissionMiddleware(req, res, next, PageTypeEnum.Slider, PermissionTypeEnum.Delete), deleteValidation, sliderItemController.delete);

export default router;