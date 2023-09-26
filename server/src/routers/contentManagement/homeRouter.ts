import express from 'express';
import {container} from 'tsyringe'; 
import { HomeController } from '../../controllers/contentManagement/homeController';

const homeController = container.resolve(HomeController);
const router = express.Router();

router.get('/test', homeController.getTest);
router.post('/getAllMenuItemsByParams', homeController.getAllMenuItemsByParams);
router.post('/getAllActiveSlidersByParams', homeController.getAllActiveSlidersByParams);

export default router;