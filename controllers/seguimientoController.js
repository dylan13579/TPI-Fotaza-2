const seguimientoModel = require('../models/seguimientoModel');
const notificacionModel = require('../models/notificacionModel');

async function seguir(req, res) {
    try {

        const idSeguido = parseInt(req.params.id);
        const idSeguidor = req.session.usuario.id;

        if (idSeguido === idSeguidor) {
            return res.send('No podés seguirte a vos mismo');
        }

        await seguimientoModel.seguir(
            idSeguidor,
            idSeguido
        );

        try {

            await notificacionModel.crear({
                id_usuario: idSeguido,
                tipo_evento: 'seguimiento',
                id_usuario_origen: idSeguidor
            });

        } catch (error) {

            console.log('Error creando notificación:', error);

        }

        
        res.redirect('/publicaciones');

    } catch (error) {

        console.log('Error siguiendo usuario:', error);

        res.send('No se pudo seguir al usuario');

    }
}

async function dejarDeSeguir(req, res) {
    try {

        await seguimientoModel.dejarDeSeguir(
            req.session.usuario.id,
            req.params.id
        );

        res.redirect('/publicaciones');

    } catch (error) {
        console.log(error);
        res.send('Error al dejar de seguir');

    }
}

async function listar(req, res) {
    try {

        const idUsuario = req.session.usuario?.id;

        const publicaciones = await publicacionModel.obtenerTodasConFavoritos(idUsuario);


        let siguiendoIds = [];

        if (idUsuario) {
            siguiendoIds = await seguimientoModel.obtenerSeguidosIds(idUsuario);
        }

        const publicacionesFinal = publicaciones.map(p => ({
            ...p,
            siguiendo: siguiendoIds.includes(p.id_usuario)
        }));

        res.render('publicaciones', {
            publicaciones: publicacionesFinal,
            usuario: req.session.usuario
        });

    } catch (error) {
        console.log(error);
        res.send('Error cargando publicaciones');
    }
}

module.exports = {
    seguir,
    dejarDeSeguir,
    listar
};