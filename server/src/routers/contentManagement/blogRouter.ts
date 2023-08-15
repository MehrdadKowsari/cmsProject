import express from 'express';
import {container} from 'tsyringe'; 
import { BlogController } from 'src/controllers/contentManagement/blogController';

const blogController = container.resolve(BlogController);
const router = express.Router();

router.post('/getAllPublishedPostsByParams', blogController.getAllPublishedPostsByParams);
router.post('/getAllMostCommentedPostsByParams', blogController.getAllMostCommentedPostsByParams);
router.post('/getAllMostPopularPostsByParams', blogController.getAllMostPopularPostsByParams);
router.post('/getAllLastPostsByParams', blogController.getAllLastPostsByParams);
router.post('/getBySlugUrl', blogController.getBySlugUrl);
router.post('/getPageBySlugUrl', blogController.getPageBySlugUrl);
router.post('/addPostComment', blogController.addPostComment);
router.post('/getAllAcceptedPostCommentsByPostId', blogController.getAllAcceptedPostCommentsByPostId);

export default router;