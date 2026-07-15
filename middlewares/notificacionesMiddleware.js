const notificacionModel = require('../models/notificacionModel');

async function notificacionesMiddleware(req, res, next) {

    try {

        if (req.session.usuario) {

            const noLeidas = await notificacionModel.contarNoLeidas(
                req.session.usuario.id
            );

            res.locals.notificacionesNoLeidas = noLeidas;

        }

        next();

    } catch (error) {
        console.error(error);
        next();
    }
}

module.exports = notificacionesMiddleware;