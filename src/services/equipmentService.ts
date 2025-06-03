import { dataBase } from "./dataBase";

interface IDevice {
  documento_identidad: string;
  equipo: string;
  serie: string;
}
export const getDeviceRequest = async (documento_identidad: string) => {
  try {
    const result = await dataBase.query(
      `SELECT * FROM gestion_equipos WHERE usuario_id = $1`,
      [documento_identidad],
    );
    console.log("equipos res -->", result.rows);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

export const createDeviceRequest = async (req: IDevice) => {
  const { documento_identidad, equipo, serie } = req;

  try {
    await dataBase.query(
      `
      INSERT INTO gestion_equipos (usuario_id, equipo, serie, estado, fecha_entrega)
      VALUES ($1, $2, $3, 'pendiente', CURRENT_DATE)
    `,
      [documento_identidad, equipo, serie],
    );

    return `Solicitud creada: ${documento_identidad} - estado pendiente`;
  } catch (error) {
    console.error("Error en createUser:", error);
    throw error;
  }
};
