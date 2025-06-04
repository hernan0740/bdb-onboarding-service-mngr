import { dataBase } from "./dataBase";
import { mappedAccess } from "./utilsServices";

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
    const filterResult = mappedAccess(result.rows);
    console.log("acces res -->", filterResult);
    return filterResult;
  } catch (error) {
    console.error(error);
  }
};

export const createAccessRequest = async (req: IAccess) => {
  const { documento_identidad, permisos } = req;

  try {
    const userCheck = await dataBase.query(
      `SELECT 1 FROM usuarios WHERE documento_identidad = $1`,
      [documento_identidad],
    );

    if (userCheck.rows.length === 0) {
      return {
        status: 404,
        message: `El usuario con documento ${documento_identidad} no existe.`,
      };
    }
    await dataBase.query(
      `
      INSERT INTO gestion_accesos (usuario_id, estado, permisos, fecha)
      VALUES ($1, 'pendiente', $2, CURRENT_DATE)
    `,
      [documento_identidad, permisos],
    );

    return {
      status: 200,
      message: `Solicitud para accesos creada: ${documento_identidad} - estado pendiente `,
    };
  } catch (error) {
    console.error("Error en createUser:", error);
    throw error;
  }
};
