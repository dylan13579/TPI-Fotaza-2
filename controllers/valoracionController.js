const valoracionModel = require('../models/valoracionModel');
const publicacionModel = require('../models/publicacionModel');
const notificacionModel = require('../models/notificacionModel');

async function votar(req, res) {
  try {
    const { id_publicacion, puntuacion } = req.body;

    const id_usuario = req.session.usuario.id;

    const publicacion = await publicacionModel.obtenerPorId(id_publicacion);

    if (!publicacion) {
      return res.send('Publicación no encontrada');
    }

    if (publicacion.id_usuario === id_usuario) {
      return res.redirect(`/publicaciones/${id_publicacion}`);
    }

    const yaVoto = await valoracionModel.obtenerVoto(
      id_publicacion,
      id_usuario
    );

    if (yaVoto) {
      await valoracionModel.actualizar(
        id_publicacion,
        id_usuario,
        puntuacion
      );
    } else {
      await valoracionModel.votar(
        id_publicacion,
        id_usuario,
        puntuacion
      );
    }

    await notificacionModel.crear({
        id_usuario: publicacion.id_usuario,
        tipo_evento: 'like',
        id_usuario_origen: id_usuario
    });

    res.redirect(`/publicaciones/${id_publicacion}`);

  } catch (error) {
    console.log(error);
    res.send('Error al votar');
  }
}

module.exports = {
  votar
};