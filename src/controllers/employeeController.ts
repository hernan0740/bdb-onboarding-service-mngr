import { Request, Response } from 'express';
import { getAllEmployees, createEmployee } from '../services/employeeService';

export const getEmployees = (req: Request, res: Response) => {
    res.json(getAllEmployees());
};

export const addEmployee = (req: Request, res: Response) => {
    createEmployee(req.body);
    res.status(201).send('Employee created');
};
