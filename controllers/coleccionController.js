const model = require('../models/coleccionModel');

async function crear(req, res) {
    await model.crear(
        req.session.usuario.id,
        req.body.nombre
    );

    res.redirect('/publicaciones');
}

async function agregar(req, res) {

    const resultado = await model.agregarPublicacion(
        req.body.coleccion,
        req.body.publicacion
    );


    req.session.mensaje = resultado.mensaje;


    res.redirect('/favoritos');
}

async function ver(req, res) {

    const publicaciones = await model.obtenerPublicaciones(
        req.params.id
    );

    res.render('coleccion', {
        publicaciones
    });

}

module.exports = {
    crear,
    agregar,
    ver
};