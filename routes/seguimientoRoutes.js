const router = require('express').Router();

console.log('RUTAS DE SEGUIMIENTO CARGADAS');

const authMiddleware = require('../middlewares/authMiddleware');
const seguimientoController = require('../controllers/seguimientoController');

router.get(
  '/seguir/:id',
  authMiddleware,
  seguimientoController.seguir
);

router.get(
  '/dejar/:id',
  authMiddleware,
  seguimientoController.dejarDeSeguir
);

module.exports = router;