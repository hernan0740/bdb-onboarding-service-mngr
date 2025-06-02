import { Router } from 'express';
import {
    getEmployees,
    addEmployee,
    accessRequestHandler,
    equipmentAssignHandler
} from '../controllers/employeeController';
import {createUser} from "../services/employeeService";

const router = Router();

router.get('/', getEmployees);
router.post('/usuarios', addEmployee);
router.post('/accesos', accessRequestHandler);
router.post('/equipos', equipmentAssignHandler);

export default router;
