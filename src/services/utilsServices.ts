export const mappedUserRequested = (data: any) => {
  return data.rows.map((user: any) => {
    const output: any = {
      documento_identidad: user.documento_identidad,
      nombre: user.nombre,
    };

    const firstEstadoUsuarios = user.estados_gestion_usuarios?.estado;
    const firstEstadoAccesos = user.estados_gestion_accesos?.estado;
    const firstEstadoEquipos = user.estados_gestion_equipos?.estado;

    if (firstEstadoUsuarios) {
      output.estados_gestion_usuarios = firstEstadoUsuarios;
    }

    if (firstEstadoAccesos) {
      output.estados_gestion_accesos = firstEstadoAccesos;
    }

    if (firstEstadoEquipos) {
      output.estados_gestion_equipos = firstEstadoEquipos;
    }

    return output;
  });
};

export const mappedAccess = (data: any) => {
  return data.map((item: any) => {
    const permisosString = item.permisos
      ? Object.entries(item.permisos)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ")
      : null;

    const fechaFormateada = item.fecha
      ? new Date(item.fecha).toISOString().split("T")[0]
      : null;

    return {
      usuario: item.usuario_id,
      estado: item.estado,
      permisos: permisosString,
      fecha_solicitud: fechaFormateada,
    };
  });
};

export const mappedDevice = (data: any) => {
  return data.map((item: any) => {
    const fechaFormateada = item.fecha_entrega
      ? new Date(item.fecha_entrega).toISOString().split("T")[0]
      : null;

    return {
      usuario: item.usuario_id,
      estado: item.estado,
      equipo: item.equipo,
      serie: item.series,
      fecha_solicitud: fechaFormateada,
    };
  });
};
