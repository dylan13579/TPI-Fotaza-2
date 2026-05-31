const comentarioModel = require('../models/comentarioModel');

async function crear(req, res) {

    try {

        const { id_publicacion, contenido } = req.body;

        await comentarioModel.crear({

            id_publicacion,

            id_usuario: req.session.usuario.id,

            texto: contenido
        });

        res.redirect(`/publicaciones/${id_publicacion}`);

    } catch (error) {

        console.log(error);
        res.send('Error comentario');
    }
}

async function eliminar(req, res) {

    try {

        const idComentario = req.params.id;
        const idUsuario = req.session.usuario.id;
        

        await comentarioModel.eliminar(idComentario, idUsuario);

        res.json({ ok: true });

    } catch (error) {
        console.error(error);
        res.send('Error al eliminar comentario');
    }
}

module.exports = {
    crear,
    eliminar
};