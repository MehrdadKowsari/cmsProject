import express from 'express';
import {container} from 'tsyringe'; 
import { ContentController } from 'src/controllers/contentManagement/contentController';

const contentController = container.resolve(ContentController);
const router = express.Router();

router.post('/getContentBlockByParams', contentController.getContentBlockByParams);

export default router;