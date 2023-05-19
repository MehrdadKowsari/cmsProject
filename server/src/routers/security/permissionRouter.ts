import express from 'express';
import { PermissionController } from '../../controllers/security/permissionController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/security/permissionValidation';

const permissionController = container.resolve(PermissionController);
const router = express.Router();

router.post('/add', addValidation, permissionController.add);
router.post('/getAll', permissionController.getAll);
router.post('/getAllByParams', permissionController.getAllByParams);
router.post('/getById', getByIdValidation, permissionController.getById);
router.post('/update', updateValidation, permissionController.update);
router.post('/toggleActive', toggleActiveValidation, permissionController.toggleActive);
router.post('/delete', deleteValidation, permissionController.delete);

export default router;