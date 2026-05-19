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
        1,           // activo por defecto
        'usuario'    // rol por defecto
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