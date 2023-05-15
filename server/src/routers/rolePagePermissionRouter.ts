import express from 'express';
import { RolePagePermissionController } from '../controllers/rolePagePermissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/security/rolePagePermissionValidation';

const rolePagePermissionController = container.resolve(RolePagePermissionController);
const router = express.Router();

router.post('/add', addValidation, rolePagePermissionController.add);
router.post('/fetchAll', rolePagePermissionController.getAll);
router.post('/getById', getByIdValidation, rolePagePermissionController.getById);
router.post('/update', updateValidation, rolePagePermissionController.update);
router.post('/delete', deleteValidation, rolePagePermissionController.delete);

export default router;