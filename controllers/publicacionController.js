const publicacionModel = require('../models/publicacionModel');

async function listar(req, res) {

    const publicaciones =
        await publicacionModel.obtenerTodas();

    res.render('publicaciones', {
        publicaciones
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

module.exports = {
    listar,
    crearView,
    crear
};