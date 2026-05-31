const db = require('../config/db');

async function crear(publicacion) {

    // Crear publicación
    const sqlPublicacion = `
        INSERT INTO publicacion
        (id_usuario, titulo, descripcion)
        VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sqlPublicacion, [
        publicacion.id_usuario,
        publicacion.titulo,
        publicacion.descripcion
    ]);

    const idPublicacion = result.insertId;

    // Guardar imagen
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
            u.nombre,
            i.url AS imagen
        FROM publicacion p

        INNER JOIN usuario u
        ON p.id_usuario = u.id

        LEFT JOIN imagen i
        ON i.id_publicacion = p.id

        ORDER BY p.id DESC
    `;

    const [rows] = await db.query(sql);

    return rows;
}

async function obtenerPorId(id) {

    const sql = `
        SELECT p.*, u.nombre AS username
        FROM publicacion p
        INNER JOIN usuario u
        ON p.id_usuario = u.id
        WHERE p.id = ?
    `;

    const [rows] = await db.query(sql, [id]);

    return rows[0];
}

module.exports = {
    crear,
    obtenerTodas,
    obtenerPorId
};

