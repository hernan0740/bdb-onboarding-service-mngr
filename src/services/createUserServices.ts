import app from "../app";
import {pool} from "./dataBase";

app.post('/usuarios', async (req, res) => {
    const { documento_identidad, nombre, correo, area, rol } = req.body;

    try {
        // Insertar usuario
        await pool.query(`
      INSERT INTO usuarios (documento_identidad, nombre, correo, area, rol)
      VALUES ($1, $2, $3, $4, $5)
    `, [documento_identidad, nombre, correo, area, rol]);

        // Registrar solicitud pendiente en gestion_usuarios
        await pool.query(`
      INSERT INTO gestion_usuarios (usuario_id, estado)
      VALUES ($1, 'pendiente')
    `, [documento_identidad]);

        // Simulación de envío a TI (podría ser un log)
        console.log(`Nueva solicitud de usuario: ${documento_identidad} - pendiente`);

        res.status(201).json({ message: 'Usuario creado y solicitud enviada a TI' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});



// POST /accesos/solicitar
app.post('/accesos/solicitar', async (req, res) => {
    const { usuario_id, permisos } = req.body; // permisos es un objeto JSON

    try {
        await pool.query(`
      INSERT INTO gestion_accesos (usuario_id, estado, permisos)
      VALUES ($1, 'pendiente', $2)
    `, [usuario_id, JSON.stringify(permisos)]);

        res.status(201).json({ message: 'Solicitud de acceso registrada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al solicitar acceso' });
    }
});


// POST /equipos/asignar
app.post('/equipos/asignar', async (req, res) => {
    const { usuario_id, equipo, serie } = req.body;

    try {
        await pool.query(`
      INSERT INTO gestion_equipos (usuario_id, equipo, serie, estado, fecha_entrega)
      VALUES ($1, $2, $3, 'entregado', CURRENT_DATE)
    `, [usuario_id, equipo, serie]);

        res.status(201).json({ message: 'Equipo asignado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar equipo' });
    }
});

