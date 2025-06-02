-- Tabla usuarios
CREATE TABLE usuarios (
    documento_identidad VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    area VARCHAR(100),
    rol VARCHAR(50),
    fecha_ingreso DATE DEFAULT CURRENT_DATE
);

-- Tabla gestion_usuarios
CREATE TABLE gestion_usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id VARCHAR(50) REFERENCES usuarios(documento_identidad),
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla gestion_accesos
CREATE TABLE gestion_accesos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id VARCHAR(50) REFERENCES usuarios(documento_identidad),
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
    permisos JSONB,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla accesos
CREATE TABLE accesos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla gestion_equipos
CREATE TABLE gestion_equipos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id VARCHAR(50) REFERENCES usuarios(documento_identidad),
    equipo VARCHAR(100),
    serie VARCHAR(100),
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'entregado')),
    fecha_entrega DATE
);
