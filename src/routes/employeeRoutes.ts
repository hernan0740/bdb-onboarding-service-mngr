import { Router } from 'express';
import {
    getEmployees,
    addEmployee,
    accessRequestHandler,
    equipmentAssignHandler, AccessRequestsGetHandler, equipmentAssignGetHandler
} from '../controllers/employeeController';
import {createUser} from "../services/employeeService";

const router = Router();

router.get('/', getEmployees);
router.get('/accesos', AccessRequestsGetHandler);
router.post('/usuarios', addEmployee);
router.post('/accesos', accessRequestHandler);
router.post('/equipos', equipmentAssignHandler);
router.get('/equipos/:documento_identidad', equipmentAssignGetHandler);

export default router;
