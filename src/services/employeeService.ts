import { IEmployee } from '../models/Iemployee';

const employees: IEmployee[] = [];

export const getAllEmployees = (): IEmployee[] => {
    return employees;
};

export const createEmployee = (employee: IEmployee): void => {
    employees.push(employee);
};
