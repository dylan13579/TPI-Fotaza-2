const db = require('../config/db');

async function crear(usuario) {

    const sql = `
        INSERT INTO usuario
        (nombre, email, password, activo, rol)
        VALUES (?, ?, ?, ?, ?)
    `;

    return db.query(sql, [
        usuario.nombre,
        usuario.email,
        usuario.password,
        1,           
        'usuario'    
    ]);
}

async function buscarPorEmail(email) {

    const sql = `
        SELECT *
        FROM usuario
        WHERE email = ?
    `;

    const [rows] = await db.query(sql, [email]);

    return rows[0];
}

module.exports = {
    crear,
    buscarPorEmail
};