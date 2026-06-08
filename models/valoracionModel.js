const db = require('../config/db');

async function votar(idPublicacion, idUsuario, puntuacion) {
  const sql = `
    INSERT INTO valoracion
    (id_imagen, id_usuario, puntuacion)
    VALUES (?, ?, ?)
  `;

  return db.query(sql, [
    idPublicacion,
    idUsuario,
    puntuacion
  ]);
}

async function obtenerEstadisticas(idPublicacion) {
  const sql = `
    SELECT
      ROUND(AVG(puntuacion),2) promedio,
      COUNT(*) cantidad
    FROM valoracion
    WHERE id_imagen = ?
  `;

  const [rows] = await db.query(sql, [idPublicacion]);
  return rows[0];
}

async function obtenerVoto(idPublicacion, idUsuario) {
  const sql = `
    SELECT *
    FROM valoracion
    WHERE id_imagen = ? AND id_usuario = ?
  `;

  const [rows] = await db.query(sql, [
    idPublicacion,
    idUsuario
  ]);

  return rows[0];
}

async function actualizar(idPublicacion, idUsuario, puntuacion) {
  const sql = `
    UPDATE valoracion
    SET puntuacion = ?
    WHERE id_imagen = ? AND id_usuario = ?
  `;

  return db.query(sql, [
    puntuacion,
    idPublicacion,
    idUsuario
  ]);
}

module.exports = {
  votar,
  obtenerEstadisticas,
  obtenerVoto,
  actualizar
};