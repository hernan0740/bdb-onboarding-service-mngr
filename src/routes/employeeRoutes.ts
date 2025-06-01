import { Router } from 'express';
import { getEmployees, addEmployee } from '../controllers/employeeController';

const router = Router();

router.get('/', getEmployees);
router.post('/', addEmployee);

export default router;
