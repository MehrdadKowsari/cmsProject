import express from 'express';
import { RoleController } from '../controllers/roleController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleAvtiveValidation, updateValidation } from 'src/validations/security/roleValidation';

const roleController = container.resolve(RoleController);
const router = express.Router();

router.post('/add', addValidation, roleController.add);
router.post('/fetchAll', roleController.getAll);
router.post('/getById', getByIdValidation, roleController.getById);
router.post('/update', updateValidation, roleController.update);
router.post('/toggleActive', toggleAvtiveValidation, roleController.toggleActive);
router.post('/delete', deleteValidation, roleController.delete);

export default router;