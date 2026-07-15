const notificacionModel = require('../models/notificacionModel');

async function ver(req, res) {

    try {

        const idUsuario = req.session.usuario.id;

        await notificacionModel.marcarTodasLeidas(idUsuario);

        res.locals.notificacionesNoLeidas = 0;

        const notificaciones = await notificacionModel.listar(idUsuario);

        res.render('notificaciones', {
            notificaciones
        });

    } catch (error) {
        console.error(error);
        res.send('Error al cargar notificaciones');
    }
}


module.exports = {
    ver
};