import { IEmployee } from '../models/Iemployee';
import {pool} from "./dataBase";

const employees: IEmployee[] = [];
interface IUser {
    documento_identidad: string,
    nombre: string,
    correo: string,
    area: string,
    rol: string
};

export const getAllEmployees = (): IEmployee[] => {
    return employees;
};

export const createEmployee = (employee: IEmployee): void => {
    employees.push(employee);
};

export const createUser = async (req: IUser): Promise<void> => {
    const { documento_identidad, nombre, correo, area, rol } = req;
    console.log("llego al body nombre",nombre);
    try {
        await pool.query(`
      INSERT INTO usuarios (documento_identidad, nombre, correo, area, rol)
      VALUES ($1, $2, $3, $4, $5)
    `, [documento_identidad, nombre, correo, area, rol]);

        await pool.query(`
      INSERT INTO gestion_usuarios (usuario_id, estado)
      VALUES ($1, 'pendiente')
    `, [documento_identidad]);

        console.log(`✅ Usuario creado: ${documento_identidad} - estado pendiente`);
    } catch (error) {
        console.error('❌ Error en createUser:', error);
        throw error; // Re-lanza el error para que lo capture el controlador
    }
};


export const requestAccess = async ({
                                        documento_identidad,
                                        permisos
                                    }: {
    documento_identidad: string;
    permisos: Record<string, boolean>;
}) => {
    try {
        await pool.query(`
      INSERT INTO gestion_accesos (usuario_id, estado, permisos)
      VALUES ($1, 'pendiente', $2)
    `, [documento_identidad, JSON.stringify(permisos)]);

        console.log(`✅ Solicitud de acceso para ${documento_identidad} registrada`);
    } catch (error) {
        console.error('❌ Error en requestAccess:', error);
        throw error;
    }
};



export const assignEquipment = async ({
                                          documento_identidad,
                                          equipo,
                                          serie,
                                          fecha_entrega
                                      }: {
    documento_identidad: string;
    equipo: string;
    serie: string;
    fecha_entrega: string;
}) => {
    try {
        await pool.query(`
      INSERT INTO gestion_equipos (usuario_id, equipo, serie, estado, fecha_entrega)
      VALUES ($1, $2, $3, 'entregado', $4)
    `, [documento_identidad, equipo, serie, fecha_entrega]);

        console.log(`✅ Equipo asignado a ${documento_identidad}`);
    } catch (error) {
        console.error('❌ Error en assignEquipment:', error);
        throw error;
    }
};

