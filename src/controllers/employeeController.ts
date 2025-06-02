import { Request, Response } from 'express';
import {
    getAllEmployees,
    createEmployee,
    createUser,
    requestAccess,
    assignEquipment,
    getAccessRequests, getComputerAssignments
} from '../services/employeeService';

export const getEmployees = (req: Request, res: Response) => {
    res.json(getAllEmployees());
};

export const addEmployee = async (req: Request, res: Response) => {
    try {
        console.log("llego al body 1",req.body);
        await createUser(req.body);
        res.status(201).send('Employee created');
    } catch (error) {
        console.error('Error en addEmployee:', error);
        res.status(500).send('Error al crear empleado');
    }
};

export const accessRequestHandler = async (req: Request, res: Response) => {
    try {
        await requestAccess(req.body);
        res.status(201).send('Solicitud de acceso registrada');
    } catch {
        res.status(500).send('Error al registrar acceso');
    }
};


export const equipmentAssignHandler = async (req: Request, res: Response) => {
    try {
        await assignEquipment(req.body);
        res.status(201).send('Equipo asignado');
    } catch {
        res.status(500).send('Error al asignar equipo');
    }
};

export const AccessRequestsGetHandler = async (req: Request, res: Response) => {
    try {
        await getAccessRequests();
        res.status(201).send('Equipo asignado');
    } catch {
        res.status(500).send('Error al asignar equipo');
    }
};
export const equipmentAssignGetHandler = async (req: Request, res: Response) => {
    try {
        const { documento_identidad } = req.params;
        await getComputerAssignments(documento_identidad);
        res.status(201).send('Accesos asignado');
    } catch {
        res.status(500).send('Error al asignar equipo');
    }
};

