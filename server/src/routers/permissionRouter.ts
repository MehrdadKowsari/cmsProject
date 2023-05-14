import express from 'express';
import { PermissionController } from '../controllers/permissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleAvtiveValidation, updateValidation } from 'src/validations/security/permissionValidation';

const permissionController = container.resolve(PermissionController);
const router = express.Router();

router.post('/add', addValidation, permissionController.add);
router.post('/fetchAll', permissionController.getAll);
router.post('/getById', getByIdValidation, permissionController.getById);
router.post('/update', updateValidation, permissionController.update);
router.post('/toggleActive', toggleAvtiveValidation, permissionController.toggleActive);
router.post('/delete', deleteValidation, permissionController.delete);

export default router;