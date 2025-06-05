# 🎮 **ONBOARDING HCHAPID**

## 📌 **Resumen**

Este repositorio gestiona la daminitracion de una plataforma para nuevos ingreos de colaboradores, incluyendo:  
**Creacion de usuarios**  
**Solicitud de equipos**  
**Solicitud de accesos**  
**Notificaciones a otra api**

El sistema opera sobre una **base de datos postgres en RDS AWS** y se desplego en **AWS LAMBDA**.

---

## 🏠 **Estructura del Proyecto**

### 📂 **Controladores (Controllers)**

`AccessRequestController`: Administracion de accesos digitales (creación, consulta).  
`AuthController`: Authenticacion de ingreso ajuste de experiencia segun rol.  
`EquipmentRequestController`: Administracion de equipos para los usuarios (solicitud, consulta).
`UserRequestController`: Gestión para la creacion de usuarios.

### 🔗 **Conexión a Recursos**

- **RDS**: Base de datos para almacenar información.
- **AWS LAMBDA**: Despliegue de apliacion en la nube.

---

## 🚀 **Tecnologías Utilizadas**

**TypeScript**  
**Node.js** (v22)  
**Express.js** (v5)

---