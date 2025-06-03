import { dataBase } from "./dataBase";

interface IAccess {
  documento_identidad: string;
  permisos: Object;
}
export const getAccessRequest = async (documento_identidad: string) => {
  try {
    const result = await dataBase.query(
      `SELECT * FROM gestion_accesos WHERE usuario_id = $1`,
      [documento_identidad],
    );
    console.log("equipos res -->", result.rows);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

export const createAccessRequest = async (req: IAccess) => {
  const { documento_identidad, permisos } = req;

  try {
    await dataBase.query(
      `
      INSERT INTO gestion_accesos (usuario_id, estado, permisos, fecha)
      VALUES ($1, 'pendiente', $2, CURRENT_DATE)
    `,
      [documento_identidad, permisos],
    );

    return `Solicitud para accesos creada: ${documento_identidad} - estado pendiente `;
  } catch (error) {
    console.error("Error en createUser:", error);
    throw error;
  }
};
