const notificacionModel = require('../models/notificacionModel');

async function notificacionesMiddleware(req, res, next) {

    try {

        if (req.session.usuario) {

            const notificaciones = await notificacionModel.listar(
                req.session.usuario.id
            );

            const noLeidas = notificaciones.filter(n => !n.leida).length;

            res.locals.notificacionesNoLeidas = noLeidas;

        }

        next();

    } catch (error) {
        console.error(error);
        next();
    }
}

module.exports = notificacionesMiddleware;