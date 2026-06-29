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

  const [info] = await db.query(`
    SELECT 
      ROUND(AVG(puntuacion),2) AS promedio,
      COUNT(*) AS cantidad
    FROM valoracion
    WHERE id_imagen = ?
  `, [idPublicacion]);

  const [rows] = await db.query(`
    SELECT puntuacion, COUNT(*) AS total
    FROM valoracion
    WHERE id_imagen = ?
    GROUP BY puntuacion
  `, [idPublicacion]);

  let estrellas = {5:0,4:0,3:0,2:0,1:0};

  rows.forEach(r => {
    estrellas[r.puntuacion] = r.total;
  });

  return {
    promedio: info[0].promedio || 0,
    cantidad: info[0].cantidad || 0,
    estrellas
  };
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