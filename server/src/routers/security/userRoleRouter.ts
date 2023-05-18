import express from 'express';
import { UserRoleController } from '../../controllers/security/userRoleController';
import {container} from 'tsyringe'; 
import { addValidation, deleteValidation, getByIdValidation, updateValidation } from 'src/validations/security/rolePagePermissionValidation';

const userRoleController = container.resolve(UserRoleController);
const router = express.Router();

router.post('/add', addValidation, userRoleController.add);
router.post('/getAllByParams', userRoleController.getAllByParams);
router.post('/getById', getByIdValidation, userRoleController.getById);
router.post('/update', updateValidation, userRoleController.update);
router.post('/delete', deleteValidation, userRoleController.delete);

export default router;