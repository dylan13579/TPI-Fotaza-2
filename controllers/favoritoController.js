const favoritoModel = require('../models/favoritoModel');

async function agregar(req, res) {
    try {
        await favoritoModel.agregar(
            req.session.usuario.id,
            req.params.id
        );

        res.redirect('/publicaciones');

    } catch (error) {
        console.log(error);

        req.session.toast = 'Ya está en favoritos';
        res.redirect('/publicaciones');
    }
}

async function listar(req, res) {
    const favoritos = await favoritoModel.listar(
        req.session.usuario.id
    );

    res.render('favoritos', {
        favoritos
    });
}

async function quitar(req, res) {
    const idUsuario = req.session.usuario.id;
    const idPublicacion = req.params.id;

    await favoritoModel.quitar(idUsuario, idPublicacion);

    res.redirect('/favoritos'); 
}


module.exports = {
    agregar,
    listar,
    quitar
};