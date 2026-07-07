const db = require('../config/db');

async function agregar(idUsuario, idPublicacion) {
    const sql = `
        INSERT INTO favorito (id_usuario, id_publicacion)
        VALUES (?, ?)
    `;

    return db.query(sql, [idUsuario, idPublicacion]);
}

async function listar(idUsuario) {
    const sql = `
        SELECT 
            p.*,
            u.username,
            i.url AS imagen
        FROM favorito f
        INNER JOIN publicacion p ON f.id_publicacion = p.id
        INNER JOIN usuario u ON p.id_usuario = u.id
        LEFT JOIN imagen i ON i.id_publicacion = p.id
        WHERE f.id_usuario = ?
        ORDER BY p.fecha DESC
    `;

    const [rows] = await db.query(sql, [idUsuario]);
    return rows;
}

async function quitar(idUsuario, idPublicacion) {
    const sql = `
        DELETE FROM favorito
        WHERE id_usuario = ? AND id_publicacion = ?
    `;

    return db.query(sql, [idUsuario, idPublicacion]);
}

module.exports = {
    agregar,
    listar,
    quitar
};