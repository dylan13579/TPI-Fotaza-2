const db = require('../config/db');

async function seguir(seguidor_id, seguido_id) {

    const sql = `
        INSERT INTO seguimiento
        (seguidor_id, seguido_id)
        VALUES (?, ?)
    `;

    return db.query(sql, [
        seguidor_id,
        seguido_id
    ]);
}

async function dejarDeSeguir(seguidor_id, seguido_id) {

    const sql = `
        DELETE FROM seguimiento
        WHERE seguidor_id = ?
        AND seguido_id = ?
    `;

    return db.query(sql, [
        seguidor_id,
        seguido_id
    ]);
}

async function cantidadSeguidores(idUsuario) {

    const sql = `
        SELECT COUNT(*) AS total
        FROM seguimiento
        WHERE seguido_id = ?
    `;

    const [rows] = await db.query(sql, [idUsuario]);

    return rows[0].total;
}

async function cantidadSeguidos(idUsuario) {

    const sql = `
        SELECT COUNT(*) AS total
        FROM seguimiento
        WHERE seguidor_id = ?
    `;

    const [rows] = await db.query(sql, [idUsuario]);

    return rows[0].total;
}

module.exports = {
    seguir,
    dejarDeSeguir,
    cantidadSeguidores,
    cantidadSeguidos
};