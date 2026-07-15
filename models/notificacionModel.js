const db = require('../config/db');

async function crear(notificacion) {

    const sql = `
        INSERT INTO notificacion
        (id_usuario, tipo_evento, id_usuario_origen, leida)
        VALUES (?, ?, ?, 0)
    `;

    return db.query(sql, [
        notificacion.id_usuario,
        notificacion.tipo_evento,
        notificacion.id_usuario_origen
    ]);
}


async function listar(idUsuario) {

    const sql = `
        SELECT n.*, u.username AS usuario_origen
        FROM notificacion n
        LEFT JOIN usuario u 
            ON n.id_usuario_origen = u.id
        WHERE n.id_usuario = ?
        ORDER BY n.fecha DESC
    `;

    const [rows] = await db.query(sql, [idUsuario]);

    return rows;
}


async function marcarTodasLeidas(idUsuario) {

    const sql = `
        UPDATE notificacion
        SET leida = 1
        WHERE id_usuario = ?
        AND leida = 0
    `;

    return db.query(sql, [idUsuario]);
}

async function contarNoLeidas(idUsuario) {

    const sql = `
        SELECT COUNT(*) AS total
        FROM notificacion
        WHERE id_usuario = ?
        AND leida = 0
    `;

    const [rows] = await db.query(sql, [idUsuario]);

    return rows[0].total;
}


module.exports = {
    crear,
    listar,
    marcarTodasLeidas,
    contarNoLeidas
};