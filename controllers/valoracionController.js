const valoracionModel = require('../models/valoracionModel');
const publicacionModel = require('../models/publicacionModel');

async function votar(req, res) {
  try {
    const {
      id_publicacion,
      puntuacion
    } = req.body;

    const id_usuario = req.session.usuario.id;

    console.log('BODY:', req.body);

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

    res.redirect(`/publicaciones/${id_publicacion}`);

  } catch (error) {
    console.log(error);
    res.send('Error al votar');
  }
}

module.exports = {
  votar
};