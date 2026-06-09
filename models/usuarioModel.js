const db = require('../config/db');

async function crear(usuario) {

    const sql = `
        INSERT INTO usuario
        (nombre, apellido, username, email, password, sexo, fecha_nacimiento, activo, rol)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return db.query(sql, [
        usuario.nombre,
        usuario.apellido,
        usuario.username,
        usuario.email,
        usuario.password,
        usuario.sexo,
        usuario.fecha_nacimiento,
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

async function buscarPorUsername(username) {

    const sql = `
        SELECT *
        FROM usuario
        WHERE username = ?
    `;

    const [rows] = await db.query(sql, [username]);

    return rows[0] || null;
}

module.exports = {
    crear,
    buscarPorEmail,
    buscarPorUsername
};