const comentarioModel = require('../models/comentarioModel');
const publicacionModel = require('../models/publicacionModel');
const notificacionModel = require('../models/notificacionModel');

async function crear(req, res) {

    try {

        const { id_publicacion, contenido } = req.body;

        await comentarioModel.crear({
            id_publicacion,
            id_usuario: req.session.usuario.id,
            texto: contenido
        });

        const publicacion = await publicacionModel.obtenerPorId(id_publicacion);

        if (publicacion.id_usuario !== req.session.usuario.id) {

            await notificacionModel.crear({
                id_usuario: publicacion.id_usuario,
                tipo_evento: 'comentario',
                id_usuario_origen: req.session.usuario.id
            });

        }

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