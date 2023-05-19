import express from 'express';
import { PagePermissionController } from '../../controllers/security/pagePermissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/security/pagePermissionValidation';

const pagePermissionController = container.resolve(PagePermissionController);
const router = express.Router();

router.post('/add', addValidation, pagePermissionController.add);
router.post('/getAll', pagePermissionController.getAll);
router.post('/getAllByParams', pagePermissionController.getAllByParams);
router.post('/getById', getByIdValidation, pagePermissionController.getById);
router.post('/update', updateValidation, pagePermissionController.update);
router.post('/delete', deleteValidation, pagePermissionController.delete);

export default router;