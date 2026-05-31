const db = require('../config/db');

async function crear(comentario) {

    const sql = `
        INSERT INTO comentario
        (id_publicacion, id_usuario, texto)
        VALUES (?, ?, ?)
    `;

    return db.query(sql, [
        comentario.id_publicacion,
        comentario.id_usuario,
        comentario.texto
    ]);
}

async function obtenerPorPublicacion(idPublicacion) {

    const sql = `
        SELECT c.*, u.nombre AS username
        FROM comentario c
        INNER JOIN usuario u
        ON c.id_usuario = u.id
        WHERE c.id_publicacion = ?
        ORDER BY c.fecha DESC
    `;

    const [rows] = await db.query(sql, [idPublicacion]);

    return rows;
}

async function eliminar(idComentario, idUsuario) {

    const sql = `
        DELETE FROM comentario
        WHERE id = ? AND id_usuario = ?
    `;

    const [result] = await db.query(sql, [idComentario, idUsuario]);

    return result;
}

module.exports = {
    crear,
    obtenerPorPublicacion,
    eliminar
};