const db = require('../config/db');

async function crear(publicacion) {

    const sql = `
        INSERT INTO publicacion
        (id_usuario, titulo, descripcion, estado)
        VALUES (?, ?, ?, 'activa')
    `;

    const [result] = await db.query(sql, [
        publicacion.id_usuario,
        publicacion.titulo,
        publicacion.descripcion
    ]);

    return result.insertId;
}

async function guardarImagen(id_publicacion, imagen) {

    const base64 = imagen.split(',')[1];

    await db.query(`
        INSERT INTO imagen (id_publicacion, url, licencia)
        VALUES (?, ?, 'copyright')
    `, [id_publicacion, base64]);
}

async function obtenerTodas() {

    const sql = `
        SELECT 
            p.*,
            u.username,
            u.nombre,
            u.apellido,
            i.url AS imagen
        FROM publicacion p
        INNER JOIN usuario u
            ON p.id_usuario = u.id
        LEFT JOIN imagen i
            ON i.id_publicacion = p.id
        ORDER BY p.fecha DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
}

async function obtenerPorId(id) {

    const sql = `
        SELECT 
            p.*, 
            u.username,
            u.nombre,
            u.apellido,
            i.url AS imagen
        FROM publicacion p
        INNER JOIN usuario u
            ON p.id_usuario = u.id
        LEFT JOIN imagen i
            ON i.id_publicacion = p.id
        WHERE p.id = ?
    `;

    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

async function buscar(texto) {

    const sql = `
        SELECT 
            p.*, 
            u.username,
            u.nombre,
            u.apellido,
            i.url AS imagen
        FROM publicacion p
        INNER JOIN usuario u
            ON p.id_usuario = u.id
        LEFT JOIN imagen i
            ON i.id_publicacion = p.id
        WHERE (
            p.titulo LIKE ?
            OR p.descripcion LIKE ?
            OR u.username LIKE ?
            OR u.nombre LIKE ?
            OR u.apellido LIKE ?
        )
        ORDER BY p.fecha DESC
    `;

    const [rows] = await db.query(sql, [
        `%${texto}%`,
        `%${texto}%`,
        `%${texto}%`,
        `%${texto}%`,
        `%${texto}%`
    ]);

    return rows;
}

module.exports = {
    crear,
    guardarImagen,
    obtenerTodas,
    obtenerPorId,
    buscar
};