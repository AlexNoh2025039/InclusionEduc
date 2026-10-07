# Inclusion Educ

**Inclusion Educ** es una aplicación web creada para facilitar la administración de procesos educativos. Permite gestionar usuarios, escuelas, cursos, talleres, reportes de incidencias y eventos, además de controlar los permisos según el rol de cada usuario.

## Tecnologías utilizadas

* **Frontend:** Angular 22, TypeScript y componentes standalone.
* **Backend:** Express, TypeScript y Prisma ORM.
* **Base de datos:** PostgreSQL.
* **Autenticación:** JWT y roles de usuario.

## Roles del sistema

| Rol               | Permisos                                                                         |
| ----------------- | -------------------------------------------------------------------------------- |
| **Administrador** | Gestiona usuarios, escuelas, cursos, reportes, talleres y eventos.               |
| **Orientador**    | Gestiona cursos, reportes y talleres. También puede actualizar su propio perfil. |
| **Estudiante**    | Consulta cursos disponibles y gestiona sus matriculaciones.                      |

El módulo de usuarios está disponible únicamente para el **Administrador**.

## Requisitos

Antes de ejecutar el proyecto necesitas:

* Node.js 20.19+ o 22.12+
* pnpm 9+
* PostgreSQL 14+
* PowerShell o CMD

## Instalación

Ubícate en la carpeta del proyecto:

```powershell
cd "C:\Users\Dell Latitude\Downloads\e\inclusionEduc"
```

Instala las dependencias del backend:

```powershell
cd backend
pnpm install
pnpm exec prisma generate
```

Después instala las del frontend:

```powershell
cd ..\frontend
pnpm install
```

## Configuración de PostgreSQL

Crea una base de datos, por ejemplo:

```text
inclusion_educ
```

Luego configura el archivo `.env` del backend. Puedes crearlo a partir de la plantilla:

```powershell
cd backend
Copy-Item .env.example .env
```

Ejemplo de configuración:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://usuario:Password123!@localhost:5432/inclusion_educ
JWT_SECRET=cambia_este_valor_por_una_clave_larga_y_secreta
JWT_EXPIRES_IN=24h
```

Para cargar el esquema de la base de datos:

```powershell
psql "postgresql://usuario:Password123!@localhost:5432/inclusion_educ" -f schema.sql
```

También puedes utilizar Prisma:

```powershell
pnpm exec prisma db push
```

> Cambia el `DATABASE_URL` y el `JWT_SECRET` según tu entorno.

## Ejecutar el proyecto

### Backend

Desde la carpeta `backend`:

```powershell
pnpm dev
```

La API estará disponible en:

`http://localhost:3000/api`

Para compilar y ejecutar:

```powershell
pnpm build
pnpm start
```

### Frontend

Desde la carpeta `frontend`:

```powershell
pnpm dev
```

La aplicación estará disponible en:

`http://localhost:4200`

Para generar la compilación final:

```powershell
pnpm build
```

Los archivos se generarán en `frontend/dist/frontend`.

## Git y limpieza

El proyecto ignora archivos y carpetas que no deben subirse al repositorio:

 `node_modules`
 `dist`
 `build`
 `.angular`
 `coverage`
 `.env`

Si necesitas hacer una compilación limpia, puedes eliminar `dist` y volver a ejecutar `pnpm build`.

### Backend

```powershell
cd backend
Remove-Item -Recurse -Force dist
pnpm build
```

### Frontend

```powershell
cd ..\frontend
Remove-Item -Recurse -Force dist
pnpm build
```

## Cuentas de prueba

El archivo `schema.sql` incluye cuentas para probar los diferentes roles.

| Rol           | Correo                    |
| ------------- | ------------------------- |
| Administrador | `admin@inclusioneduc.org` |
| Orientador    | `elena.gomez@sanjose.edu` |
| Estudiante    | `carlos.m@estudiante.edu` |

**Contraseña de prueba:**

```text
Password123!
```

 Estas cuentas son para pruebas. Se recomienda cambiar las contraseñas antes de utilizar el proyecto en un entorno compartido o de producción.

## Acceso rápido

Una vez iniciado el proyecto:

* **Frontend:** `http://localhost:4200`
* **Backend API:** `http://localhost:3000/api`

Para trabajar normalmente, solo necesitas ejecutar `pnpm dev` en el backend y frontend.
