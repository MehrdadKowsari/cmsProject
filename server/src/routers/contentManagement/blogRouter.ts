import express from 'express';
import {container} from 'tsyringe'; 
import { BlogController } from 'src/controllers/contentManagement/blogController';

const blogController = container.resolve(BlogController);
const router = express.Router();

router.post('/getAllPublishedPostsByParams', blogController.getAllPublishedPostsByParams);
router.post('/getBySlugUrl', blogController.getBySlugUrl);

export default router;