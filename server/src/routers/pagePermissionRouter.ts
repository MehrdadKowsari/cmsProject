import express from 'express';
import { PagePermissionController } from '../controllers/pagePermissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/security/pagePermissionValidation';

const pagePermissionController = container.resolve(PagePermissionController);
const router = express.Router();

router.post('/add', addValidation, pagePermissionController.add);
router.post('/fetchAll', pagePermissionController.getAll);
router.post('/getById', getByIdValidation, pagePermissionController.getById);
router.post('/update', updateValidation, pagePermissionController.update);
router.post('/delete', deleteValidation, pagePermissionController.delete);

export default router;