DROP DATABASE IF EXISTS fotaza2;

CREATE DATABASE fotaza2;
USE fotaza2;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255),
    sexo ENUM('M','F'),
    fecha_nacimiento DATE,
    activo TINYINT(1) DEFAULT 1,
    rol ENUM('usuario','admin') DEFAULT 'usuario',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publicacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    titulo VARCHAR(200),
    descripcion TEXT,
    comentarios_abiertos TINYINT(1) DEFAULT 1,
    estado ENUM('activa','bloqueada') DEFAULT 'activa',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
);

CREATE TABLE comentario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_publicacion INT,
    id_usuario INT,
    texto TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_publicacion) REFERENCES publicacion(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
);

CREATE TABLE valoracion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_imagen INT,
    id_usuario INT,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),

    FOREIGN KEY (id_imagen) REFERENCES publicacion(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
);

CREATE TABLE seguimiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seguidor_id INT,
    seguido_id INT,

    FOREIGN KEY (seguidor_id) REFERENCES usuario(id)
        ON DELETE CASCADE,
    FOREIGN KEY (seguido_id) REFERENCES usuario(id)
        ON DELETE CASCADE,

    UNIQUE (seguidor_id, seguido_id)
);