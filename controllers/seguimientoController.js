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

        await notificacionModel.crear({
            id_usuario: idSeguido,
            tipo_evento: 'seguimiento',
            id_usuario_origen: idSeguidor
        });

        res.redirect('/publicaciones');

    } catch (error) {
        console.log(error);
        res.send('Ya seguís a este usuario');
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
        res.send('Error');
    }
}

async function listar(req, res) {

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
}

module.exports = {
    seguir,
    dejarDeSeguir,
    listar
};