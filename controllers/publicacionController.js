const publicacionModel = require('../models/publicacionModel');
const comentarioModel = require('../models/comentarioModel');
const valoracionModel = require('../models/valoracionModel');
const seguimientoModel = require('../models/seguimientoModel');

async function listar(req, res) {

    const publicaciones =
        await publicacionModel.obtenerTodas();

    res.render('publicaciones', {
        publicaciones,
        usuario: req.session.usuario
    });
}

function crearView(req, res) {
    res.render('crear-publicacion');
}

async function crear(req, res) {

    try {

        const {
            titulo,
            descripcion,
            imagen
        } = req.body;

        await publicacionModel.crear({
            id_usuario: req.session.usuario.id,
            titulo,
            descripcion,
            imagen
        });

        res.redirect('/publicaciones');

    } catch (error) {
        console.log(error);
        res.send('Error publicación');
    }
}

async function detalle(req, res) {

    try {

        const id = req.params.id;

        const publicacion =
            await publicacionModel.obtenerPorId(id);

        const comentarios =
            await comentarioModel.obtenerPorPublicacion(id);

        const estadisticas =
            await valoracionModel.obtenerEstadisticas(id);

        const esAutor =
            req.session.usuario &&
            publicacion.id_usuario === req.session.usuario.id;

        res.render('detalle-publicacion', {
            publicacion,
            comentarios,
            estadisticas,
            usuario: req.session.usuario,
            esAutor
        });

    } catch (error) {
        console.log(error);
        res.send('Error detalle');
    }
}

async function buscar(req, res) {

    try {

        const texto = req.query.q || '';

        const publicaciones =
            await publicacionModel.buscar(texto);

        res.render('publicaciones', {
            publicaciones,
            usuario: req.session.usuario
        });

    } catch (error) {
        console.log(error);
        res.send('Error en búsqueda');
    }
}

async function perfil(req, res) {

    try {

        const idUsuario = req.params.id;

        const publicaciones =
            await publicacionModel.obtenerPorUsuario(idUsuario);

        const seguidores =
            await seguimientoModel.cantidadSeguidores(idUsuario);

        const seguidos =
            await seguimientoModel.cantidadSeguidos(idUsuario);

        res.render('perfil', {
            publicaciones,
            seguidores,
            seguidos
        });

    } catch (error) {

        console.log(error);
        res.send('Error en perfil');
    }
}

module.exports = {
    listar,
    crearView,
    crear,
    detalle,
    buscar,
    perfil
};