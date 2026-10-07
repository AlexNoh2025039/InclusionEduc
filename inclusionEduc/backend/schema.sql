create table roles (
    rol_id serial primary key,
    nombre varchar(30) unique not null
);

create table escuelas (
    escuela_id serial primary key,
    nombre varchar(150) not null,
    codigo_distrito varchar(20),
    direccion varchar(255),
    creado_en timestamp default current_timestamp
);

create table usuarios (
    usuario_id serial primary key,
    rol_id int not null references roles(rol_id),
    escuela_id int references escuelas(escuela_id) on delete set null,
    nombre varchar(100) not null,
    email varchar(100) unique not null,
    password_hash varchar(255) not null,
    estado varchar(20) default 'activo',
    creado_en timestamp default current_timestamp
);

create table reportes_incidencia (
    reporte_id serial primary key,
    escuela_id int not null references escuelas(escuela_id) on delete cascade,
    tipo_acoso varchar(50) not null,
    descripcion text not null,
    nivel_prioridad varchar(20) default 'Media',
    estado varchar(20) default 'Pendiente',
    es_anonimo boolean default true,
    usuario_id int references usuarios(usuario_id) on delete set null,
    creado_en timestamp default current_timestamp
);

create table cursos (
    curso_id serial primary key,
    titulo varchar(120) not null,
    descripcion text not null,
    duracion_min int check (duracion_min > 0),
    nivel varchar(20) default 'Básico',
    video_url text,
    pdf_data text,
    pdf_name varchar(255),
    creado_en timestamp default current_timestamp
);

create table inscripciones_cursos (
    inscripcion_id serial primary key,
    usuario_id int not null references usuarios(usuario_id) on delete cascade,
    curso_id int not null references cursos(curso_id) on delete cascade,
    estado varchar(20) default 'En Curso',
    porcentaje_progreso int default 0 check (porcentaje_progreso between 0 and 100),
    fecha_completado timestamp,
    unique (usuario_id, curso_id)
);

create table eventos_talleres (
    evento_id serial primary key,
    escuela_id int not null references escuelas(escuela_id) on delete cascade,
    creador_id int not null references usuarios(usuario_id),
    titulo varchar(150) not null,
    fecha_evento timestamp not null,
    lugar varchar(100) not null
);

 insert into roles (nombre) values
('Administrador'), ('Orientador'), ('Estudiante');

insert into escuelas (nombre, codigo_distrito, direccion) values
('Colegio San José', 'DIST-01', 'Av. Las Américas 12-45'),
('Instituto Nacional Juventud', 'DIST-02', 'Calle Los Pinos 8-10');

insert into usuarios (rol_id, escuela_id, nombre, email, password_hash) values
(1, null, 'Admin Sistema', 'admin@inclusioneduc.org', '$2b$10$IxujkkjXKJAtJXMNbz7ebeUIU5UOlDkqBtW4a3cRnrmcBrKs7gJmq'),
(2, 1, 'Profra. Elena Gómez', 'elena.gomez@sanjose.edu', '$2b$10$IxujkkjXKJAtJXMNbz7ebeUIU5UOlDkqBtW4a3cRnrmcBrKs7gJmq'),
(3, 1, 'Carlos Mendoza', 'carlos.m@estudiante.edu', '$2b$10$IxujkkjXKJAtJXMNbz7ebeUIU5UOlDkqBtW4a3cRnrmcBrKs7gJmq');

insert into cursos (titulo, descripcion, duracion_min, nivel, video_url) values
('Prevención del Ciberbullying', 'Aprende a identificar y frenar el acoso en redes sociales, a reconocer señales de violencia digital y a responder con respeto.', 45, 'Básico', 'https://www.youtube.com/results?search_query=prevencion+del+ciberbullying'),
('Resolución Pacífica de Conflictos', 'Desarrolla técnicas de mediación, escucha activa y diálogo para resolver conflictos entre compañeros sin violencia.', 60, 'Intermedio', 'https://www.youtube.com/results?search_query=resolver+conflictos+peacefully');

insert into reportes_incidencia (escuela_id, tipo_acoso, descripcion, nivel_prioridad, estado, es_anonimo) values
(1, 'Verbal', 'Comentarios despectivos recurrentes en el área del recreo.', 'Media', 'Pendiente', true),
(1, 'Ciberbullying', 'Creación de un grupo no autorizado para burlarse de compañeros.', 'Alta', 'En Proceso', true);

insert into inscripciones_cursos (usuario_id, curso_id, estado, porcentaje_progreso) values
(3, 1, 'En Curso', 50);

insert into eventos_talleres (escuela_id, creador_id, titulo, fecha_evento, lugar) values
(1, 2, 'Foro sobre Inclusión y Empatía', '2026-11-15 10:00:00', 'Auditorio Principal');

 SELECT * FROM roles;