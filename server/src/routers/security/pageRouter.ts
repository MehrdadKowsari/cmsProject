import express from 'express';
import { PageController } from '../../controllers/security/pageController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, toggleHiddenValidation, updateValidation } from 'src/validations/security/pageValidation';

const pageController = container.resolve(PageController);
const router = express.Router();

router.post('/add', addValidation, pageController.add);
router.post('/fetchAll', pageController.getAll);
router.post('/getById', getByIdValidation, pageController.getById);
router.post('/update', updateValidation, pageController.update);
router.post('/toggleActive', toggleActiveValidation, pageController.toggleActive);
router.post('/toggleHidden', toggleHiddenValidation, pageController.toggleHidden);
router.post('/delete', deleteValidation, pageController.delete);

export default router;