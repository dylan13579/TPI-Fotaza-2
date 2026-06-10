const db = require('../config/db');

async function crear(publicacion) {

    const sqlPublicacion = `
        INSERT INTO publicacion
        (id_usuario, titulo, descripcion, estado)
        VALUES (?, ?, ?, 'activa')
    `;

    const [result] = await db.query(sqlPublicacion, [
        publicacion.id_usuario,
        publicacion.titulo,
        publicacion.descripcion
    ]);

    const idPublicacion = result.insertId;

    if (publicacion.imagen) {

        const sqlImagen = `
            INSERT INTO imagen
            (id_publicacion, url, licencia, marca_agua)
            VALUES (?, ?, 'copyright', '')
        `;

        await db.query(sqlImagen, [
            idPublicacion,
            publicacion.imagen
        ]);
    }

    return idPublicacion;
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
            u.apellido
        FROM publicacion p

        INNER JOIN usuario u
            ON p.id_usuario = u.id

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
            p.titulo LIKE ? COLLATE utf8mb4_general_ci
            OR p.descripcion LIKE ? COLLATE utf8mb4_general_ci
            OR u.username LIKE ? COLLATE utf8mb4_general_ci
            OR u.nombre LIKE ? COLLATE utf8mb4_general_ci
            OR u.apellido LIKE ? COLLATE utf8mb4_general_ci
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
    obtenerTodas,
    obtenerPorId,
    buscar
};