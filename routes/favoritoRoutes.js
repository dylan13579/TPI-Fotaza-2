const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/favoritoController');

router.post('/agregar/:id', authMiddleware, controller.agregar);
router.post('/quitar/:id', authMiddleware, controller.quitar);
router.get('/', authMiddleware, controller.listar);

module.exports = router;