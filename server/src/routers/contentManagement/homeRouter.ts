import express from 'express';
import { SliderItemController } from '../../controllers/contentManagement/sliderItemController';
import {container} from 'tsyringe'; 

const sliderItemController = container.resolve(SliderItemController);
const router = express.Router();

router.post('/getAllActiveSlidersByParams', sliderItemController.getAllActiveSlidersByParams);

export default router;