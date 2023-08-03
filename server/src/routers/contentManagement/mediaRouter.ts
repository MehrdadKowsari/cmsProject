import express from 'express';
import {container} from 'tsyringe'; 
import { MediaController } from 'src/controllers/contentManagement/mediaController';

const mediaController = container.resolve(MediaController);
const router = express.Router();

router.post('/getAllActiveGalleryCategoriesByParams', mediaController.getAllActiveGalleryCategoriesByParams);
router.post('/getAllActiveGalleriesByParams', mediaController.getAllActiveGalleriesByParams);
router.post('/getAllGalleryFilesByGalleryId', mediaController.getAllGalleryFilesByGalleryId);

export default router;