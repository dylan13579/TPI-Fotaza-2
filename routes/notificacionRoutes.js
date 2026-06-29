const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/notificacionController');

router.get('/', authMiddleware, controller.ver);

router.get('/leer/:id', authMiddleware, controller.leer);

module.exports = router;