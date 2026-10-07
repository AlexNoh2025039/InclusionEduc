# Inclusion Educ

Inclusion Educ es una aplicación web para la gestión educativa institucional. Permite administrar usuarios, escuelas, cursos, reportes de incidencias, eventos y talleres, así como controlar el acceso según el rol de cada usuario.

La solución está compuesta por un frontend en Angular para la experiencia del usuario y un backend en Node.js + Express que expone una API REST y utiliza Prisma como ORM para PostgreSQL.

## Descripción general

El sistema está pensado para apoyar la organización de actividades académicas y de apoyo dentro de escuelas o instituciones educativas. Entre sus funcionalidades principales se encuentran:

- Autenticación de usuarios con JWT.
- Gestión de usuarios, roles y escuelas.
- Administración de cursos y matrículas.
- Registro y seguimiento de reportes de incidencias.
- Creación y gestión de eventos y talleres.
- Control de acceso según permisos por rol.
- Separación de responsabilidades entre frontend, API y base de datos.

 

### Backend
El backend sigue una arquitectura por capas:

- config: configuración general y variables de entorno.
- controllers: controlan la lógica de cada endpoint HTTP.
- routes: definen las rutas de la API.
- middlewares: validaciones, autenticación y control de roles.
- services: lógica de negocio.
- models: acceso a datos mediante Prisma.
- utils: utilidades para JWT y contraseñas.

### Frontend
El frontend se construye con Angular y tiene una estructura basada en módulos/componentes, con vistas para login, dashboard y otras pantallas principales como cursos, escuelas, reportes y eventos.

## Roles y permisos

| Rol | Descripción | Permisos principales |
| --- | --- | --- |
| Administrador | Gestiona la plataforma | Administra usuarios, escuelas, cursos, reportes, eventos y configuración general |
| Orientador | Apoya la gestión educativa | Gestiona cursos, reportes, talleres y su perfil personal |
| Estudiante | Participa en la plataforma | Consulta cursos disponibles, reportes y su información personal |

El acceso a funcionalidades sensibles está restringido según el rol del usuario, y la API valida esta condición mediante middlewares de autenticación y permisos.

## Requisitos previos

Antes de iniciar el proyecto, asegúrate de tener instalado:

- Node.js 20.19+ o 22.12+
- pnpm 9+
- PostgreSQL 14+
- Git
- PowerShell, CMD o terminal compatible

## Instalación

1. Clona el repositorio:

 git clone <url-del-repositorio>
cd inclusionEduc
 
2. Instala las dependencias del backend:

 cd backend
pnpm install
pnpm exec prisma generate
 

3. Instala las dependencias del frontend:

 cd ../frontend
pnpm install
 
## Configuración de variables de entorno

Crea el archivo `.env` dentro de `backend` usando la plantilla existente:

 cd backend
Copy-Item .env.example .env
 
Ejemplo de configuración:

 PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://usuario:password@localhost:5432/inclusion_educ
JWT_SECRET=cambia_este_valor_por_una_clave_larga_y_secreta
JWT_EXPIRES_IN=24h
 
> Cambia los valores de `DATABASE_URL` y `JWT_SECRET` según tu entorno local o de producción.

## Base de datos

El proyecto usa PostgreSQL junto con Prisma.

Puedes crear la base de datos manualmente y luego ejecutar el esquema:

 psql "postgresql://usuario:password@localhost:5432/inclusion_educ" -f schema.sql
 
También puedes sincronizar el esquema con Prisma:

 cd backend
pnpm exec prisma db push
 

## Ejecución del proyecto

### Backend

Desde la carpeta `backend`: se usa cd 
pnpm install
pnpm dev

La API quedará disponible en:

http://localhost:3000/api

También puedes compilar y ejecutar la versión de producción:

pnpm build
pnpm start

### Frontend

Desde la carpeta `frontend`: se usa cd
pnpm install
pnpm dev

La aplicación se abrirá en la ruta:

http://localhost:4200

Para compilar la versión final:

pnpm build

Los archivos compilados se generarán en:

frontend/dist/frontend

## Endpoints principales

La API REST del backend expone endpoints agrupados por funcionalidad:

- `/api/auth` - inicio de sesión y registro
- `/api/usuarios` - gestión de usuarios
- `/api/escuelas` - administración de escuelas
- `/api/cursos` - cursos y matrículas
- `/api/reportes` - reportes de incidencias
- `/api/eventos` - eventos y talleres

## Cuentas de prueba

El archivo `schema.sql` incluye usuarios de prueba para validar los roles del sistema.

| Rol           | Correo                    | Contraseña      |
| ---           | ---                       | ---             |
| Administrador | `admin@inclusioneduc.org` | `Password123!`  |
| Orientador    | `elena.gomez@sanjose.edu` | `Password123!`  |
| Estudiante    | `carlos.m@estudiante.edu` | `Password123!`  |

Estas cuentas sirven para pruebas locales y deben cambiarse en entornos reales.

## Flujo esperado de uso

1. El usuario accede al frontend e inicia sesión.
2. El backend valida credenciales y devuelve un JWT.
3. El frontend almacena la sesión y permite navegar según el rol del usuario.
4. El usuario puede acceder a cursos, escuelas, eventos, reportes y perfil.
5. El administrador puede gestionar usuarios y configuraciones del sistema.
6. Los demás roles acceden solo a las secciones permitidas por su nivel de permisos.

## Mantenimiento y limpieza

El repositorio ignora archivos generados y sensibles como:

- `node_modules`
- `dist`
- `build`
- `.angular`
- `coverage`
- `.env`

 
## Uso de IA
- Se admite el uso de ia en la idea y estructura de prisma para poderme guiar en poder conectar de mejor manera la base de datos
de postgrestSQL.
- Tambien se admite en todos los css y la mayoria de htmls.
- Con las demas cosas se tomo una guia de trabajos anteriores y 

## Conclusión

Inclusion Educ busca centralizar la gestión académica y de incidencias de una institución educativa en una plataforma moderna, segura y fácil de operar. La combinación de Angular, Express y Prisma permite una solución escalable, mantenible y preparada para crecer con nuevas funcionalidades.