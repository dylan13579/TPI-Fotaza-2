const denunciaModel = require('../models/denunciaModel');
const publicacionModel = require('../models/publicacionModel');

async function crear(req, res) {
  try {
    let { tipo, id_referencia, motivo, descripcion } = req.body;
    const id_usuario = req.session.usuario.id;

    motivo = motivo.trim().toLowerCase();

    await denunciaModel.crear({
      id_usuario,
      tipo,
      id_referencia,
      motivo,
      descripcion
    });

    if (tipo === 'publicacion') {

      const total = await denunciaModel.contarDenunciasSimilares(
        id_referencia,
        motivo
      );

      // si hay 3 o mas denuncias se bloquea
      if (total >= 3) {
        await publicacionModel.bloquearPublicacion(id_referencia);
      }
    }

    res.redirect('/publicaciones');

  } catch (error) {

    res.send("Error al denunciar");
  }
}

async function listar(req, res) {
  try {
    const denuncias = await denunciaModel.obtenerTodas();
    res.render('admin/denuncia', { denuncias });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  crear,
  listar
};