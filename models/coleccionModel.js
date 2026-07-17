const db = require('../config/db');

async function crear(idUsuario, nombre) {
    return db.query(
        `
        INSERT INTO coleccion
        (id_usuario, nombre)
        VALUES (?, ?)
        `,
        [idUsuario, nombre]
    );
}

async function agregarPublicacion(coleccion, publicacion) {

    try {

        await db.query(
            `
            INSERT INTO coleccion_publicacion
            (id_coleccion, id_publicacion)
            VALUES (?, ?)
            `,
            [
                coleccion,
                publicacion
            ]
        );


        return {
            estado: true,
            mensaje: "Publicación guardada en la colección"
        };


    } catch (error) {


        if (error.code === 'ER_DUP_ENTRY') {

            return {
                estado: false,
                mensaje: "Esta publicación ya está guardada en esta colección"
            };

        }


        throw error;

    }

}

async function obtenerPorUsuario(idUsuario) {
    const [rows] = await db.query(
        `
        SELECT *
        FROM coleccion
        WHERE id_usuario = ?
        ORDER BY nombre
        `,
        [idUsuario]
    );

    return rows;
}

async function obtenerPublicaciones(idColeccion) {

    const [rows] = await db.query(
        `
        SELECT 
            p.*,
            u.username,
            i.url AS imagen

        FROM publicacion p

        INNER JOIN coleccion_publicacion cp
        ON cp.id_publicacion = p.id

        INNER JOIN usuario u
        ON u.id = p.id_usuario

        LEFT JOIN imagen i
        ON i.id_publicacion = p.id

        WHERE cp.id_coleccion = ?
        `,
        [idColeccion]
    );

    return rows;
}

module.exports = {
    crear,
    agregarPublicacion,
    obtenerPorUsuario,
    obtenerPublicaciones
};