import express from 'express';
import {container} from 'tsyringe'; 
import { HomeController } from 'src/controllers/contentManagement/homeController';

const homeController = container.resolve(HomeController);
const router = express.Router();

router.post('/getAllMenuItemsByParams', homeController.getAllMenuItemsByParams);
router.post('/getAllActiveSlidersByParams', homeController.getAllActiveSlidersByParams);

export default router;