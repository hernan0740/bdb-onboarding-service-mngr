import { dataBase } from "./dataBase";

interface IUser {
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
    return `Solicitud creada: ${documento_identidad} - estado pendiente`;
  } catch (error) {
    console.error("Error en createUser:", error);
    throw error;
  }
};

/*app.post('/usuarios', async (req, res) => {
    const { documento_identidad, nombre, correo, area, rol } = req.body;

    try {
        await dataBase.query(`
      INSERT INTO usuarios (documento_identidad, nombre, correo, area, rol)
      VALUES ($1, $2, $3, $4, $5)
    `, [documento_identidad, nombre, correo, area, rol]);

        await dataBase.query(`
      INSERT INTO gestion_usuarios (usuario_id, estado)
      VALUES ($1, 'pendiente')
    `, [documento_identidad]);

        console.log(`Nueva solicitud de usuario: ${documento_identidad} - pendiente`);

        res.status(201).json({ message: 'Usuario creado y solicitud enviada a TI' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});



app.post('/accesos/solicitar', async (req, res) => {
    const { usuario_id, permisos } = req.body;

    try {
        await dataBase.query(`
      INSERT INTO gestion_accesos (usuario_id, estado, permisos)
      VALUES ($1, 'pendiente', $2)
    `, [usuario_id, JSON.stringify(permisos)]);

        res.status(201).json({ message: 'Solicitud de acceso registrada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al solicitar acceso' });
    }
});


app.post('/equipos/asignar', async (req, res) => {
    const { usuario_id, equipo, serie } = req.body;

    try {
        await dataBase.query(`
      INSERT INTO gestion_equipos (usuario_id, equipo, serie, estado, fecha_entrega)
      VALUES ($1, $2, $3, 'entregado', CURRENT_DATE)
    `, [usuario_id, equipo, serie]);

        res.status(201).json({ message: 'Equipo asignado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar equipo' });
    }
});*/
