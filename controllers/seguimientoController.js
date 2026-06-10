const seguimientoModel = require('../models/seguimientoModel');

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

module.exports = {
    seguir,
    dejarDeSeguir
};