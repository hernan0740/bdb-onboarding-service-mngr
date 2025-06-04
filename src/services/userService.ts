import { dataBase } from "./dataBase";
import { mappedUserRequested } from "./utilsServices";

export interface IUser {
  documento_identidad: string;
  nombre: string;
  correo: string;
  area: string;
  rol: string;
}

export const getUser = async (documento_identidad: string) => {
  try {
    const result = await dataBase.query(
      `SELECT * FROM usuarios WHERE documento_identidad = $1`,
      [documento_identidad],
    );
    console.log("equipos res -->", result.rows);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

export const getUserAll = async () => {
  try {
    const result = await dataBase.query(`SELECT * FROM usuarios`);
    console.log("equipos res -->", result.rows);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (req: IUser) => {
  const { documento_identidad, nombre, correo, area, rol } = req;
  console.log("llego al body nombre", nombre);
  try {
    await dataBase.query(
      `
      INSERT INTO usuarios (documento_identidad, nombre, correo, area, rol)
      VALUES ($1, $2, $3, $4, $5)
    `,
      [documento_identidad, nombre, correo, area, rol],
    );

    await dataBase.query(
      `
      INSERT INTO gestion_usuarios (usuario_id, estado)
      VALUES ($1, 'pendiente')
    `,
      [documento_identidad],
    );
    return {
      status: 200,
      message: `Solicitud creada: ${documento_identidad} - estado pendiente`,
    };
  } catch (error) {
    console.error("Error en createUser:", error);
    throw error;
  }
};

export const getUserWithSolicitudes = async (documento_identidad: string) => {
  try {
    const query = `
      SELECT 
        u.documento_identidad,
        u.nombre,

        -- Solo el estado de cada solicitud en gestión_usuarios
        (
          SELECT json_agg(json_build_object('estado', gu.estado))
          FROM gestion_usuarios gu
          WHERE gu.usuario_id = u.documento_identidad
        ) AS solicitudes_gestion_usuarios,

        -- Solo el estado de cada solicitud en gestión_accesos
        (
          SELECT json_agg(json_build_object('estado', ga.estado))
          FROM gestion_accesos ga
          WHERE ga.usuario_id = u.documento_identidad
        ) AS solicitudes_gestion_accesos,

        -- Solo el estado de cada solicitud en gestión_equipos
        (
          SELECT json_agg(json_build_object('estado', ge.estado))
          FROM gestion_equipos ge
          WHERE ge.usuario_id = u.documento_identidad
        ) AS solicitudes_gestion_equipos

      FROM usuarios u
      WHERE u.documento_identidad = $1;
    `;

    const result = await dataBase.query(query, [documento_identidad]);

    console.log("Usuario con estados de solicitudes -->", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error al obtener el usuario con estados de solicitudes:",
      error,
    );
    throw error;
  }
};

export const getAllUsersWithEstados = async () => {
  try {
    const query = `
      SELECT 
        u.documento_identidad,
        u.nombre,

        -- Estado de gestión_usuarios
        (
          SELECT json_build_object('estado', gu.estado)
          FROM gestion_usuarios gu
          WHERE gu.usuario_id = u.documento_identidad
          LIMIT 1
        ) AS estados_gestion_usuarios,

        -- Estado de gestión_accesos
        (
          SELECT json_build_object('estado', ga.estado)
          FROM gestion_accesos ga
          WHERE ga.usuario_id = u.documento_identidad
          LIMIT 1
        ) AS estados_gestion_accesos,

        -- Estado de gestión_equipos
        (
          SELECT json_build_object('estado', ge.estado)
          FROM gestion_equipos ge
          WHERE ge.usuario_id = u.documento_identidad
          LIMIT 1
        ) AS estados_gestion_equipos

      FROM usuarios u;
    `;

    const result = await dataBase.query(query);

    const mappedResult = mappedUserRequested(result);

    console.log("Usuarios mapeados:", mappedResult);
    return mappedResult;
  } catch (error) {
    console.error("Error al obtener y mapear los usuarios con estados:", error);
    throw error;
  }
};
