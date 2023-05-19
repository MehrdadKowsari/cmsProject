import express from 'express';
import { RoleController } from '../../controllers/security/roleController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, toggleActiveValidation, updateValidation } from 'src/validations/security/roleValidation';

const roleController = container.resolve(RoleController);
const router = express.Router();

router.post('/add', addValidation, roleController.add);
router.post('/getAll', roleController.getAll);
router.post('/getAllByParams', roleController.getAllByParams);
router.post('/getById', getByIdValidation, roleController.getById);
router.post('/update', updateValidation, roleController.update);
router.post('/toggleActive', toggleActiveValidation, roleController.toggleActive);
router.post('/delete', deleteValidation, roleController.delete);

export default router;