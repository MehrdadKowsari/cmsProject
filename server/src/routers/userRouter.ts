import express from 'express';
import { add, fetchAll, getById, getCurrent, update, toggleActive, remove, updateProfile } from '../controllers/userController'

const router = express.Router();

router.post('/add', add);
router.post('/fetchAll', fetchAll);
router.post('/getById', getById);
router.post('/getCurrent', getCurrent);
router.post('/delete', remove);
router.post('/update', update);
router.post('/updateProfile', updateProfile);
router.post('/toggleActive', toggleActive);

export default router;