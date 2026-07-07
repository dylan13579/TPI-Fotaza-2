const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const seguimientoController = require('../controllers/seguimientoController');

router.post(
  '/seguir/:id',
  authMiddleware,
  seguimientoController.seguir
);

router.post(
  '/dejar/:id',
  authMiddleware,
  seguimientoController.dejarDeSeguir
);

module.exports = router;