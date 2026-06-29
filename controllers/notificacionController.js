const notificacionModel = require('../models/notificacionModel');

async function ver(req, res) {

    try {
        const notificaciones = await notificacionModel.listar(
            req.session.usuario.id
        );

        res.render('notificaciones', {
            notificaciones
        });

    } catch (error) {
        console.error(error);
        res.send('Error al cargar notificaciones');
    }
}


async function leer(req, res) {

    try {
        await notificacionModel.marcarLeida(req.params.id);

        res.redirect('/notificaciones');

    } catch (error) {
        console.error(error);
        res.send('Error al marcar como leída');
    }
}

module.exports = {
    ver,
    leer
};