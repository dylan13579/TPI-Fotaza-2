const valoracionModel = require('../models/valoracionModel');
const publicacionModel = require('../models/publicacionModel');

async function votar(req, res) {
  try {
    const {
      id_publicacion,
      puntuacion
    } = req.body;

    const id_usuario = req.session.usuario.id;

    console.log('BODY:', req.body); // DEBUG

    // 🔎 obtener publicación
    const publicacion = await publicacionModel.obtenerPorId(id_publicacion);

    if (!publicacion) {
      return res.send('Publicación no encontrada');
    }

    // 🚫 evitar que el autor vote
    if (publicacion.id_usuario === id_usuario) {
      return res.send('No podés votar tu propia publicación');
    }

    // 🔎 ver si ya votó
    const yaVoto = await valoracionModel.obtenerVoto(
      id_publicacion,
      id_usuario
    );

    if (yaVoto) {
      // 🔁 actualizar voto
      await valoracionModel.actualizar(
        id_publicacion,
        id_usuario,
        puntuacion
      );
    } else {
      // ➕ nuevo voto
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