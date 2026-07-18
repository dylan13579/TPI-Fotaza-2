const db = require('../config/db');

async function crear(denuncia) {
  const sql = `
    INSERT INTO denuncia 
    (id_usuario, tipo, id_referencia, motivo, descripcion)
    VALUES (?, ?, ?, ?, ?)
  `;

  return db.query(sql, [
    denuncia.id_usuario,
    denuncia.tipo,
    denuncia.id_referencia,
    denuncia.motivo,
    denuncia.descripcion
  ]);
}

async function obtenerTodas() {
  const sql = `
    SELECT 
      d.*,
      u.username,

      p.titulo AS publicacion_titulo,

      c.texto AS comentario_contenido,
      c.id_publicacion AS comentario_publicacion_id

    FROM denuncia d

    JOIN usuario u 
      ON d.id_usuario = u.id

    LEFT JOIN publicacion p 
      ON d.tipo = 'publicacion' 
      AND d.id_referencia = p.id

    LEFT JOIN comentario c 
      ON d.tipo = 'comentario' 
      AND d.id_referencia = c.id

    ORDER BY d.fecha DESC
  `;

  const [rows] = await db.query(sql);
  return rows;
}

async function contarDenunciasSimilares(id_referencia, motivo) {
  const sql = `
    SELECT COUNT(DISTINCT id_usuario) AS total
    FROM denuncia
    WHERE tipo = 'publicacion'
      AND id_referencia = ?
      AND LOWER(TRIM(motivo)) = LOWER(TRIM(?))
  `;

  const [rows] = await db.query(sql, [id_referencia, motivo]);
  return rows[0].total;
}

module.exports = {
  crear,
  obtenerTodas,
  contarDenunciasSimilares
};