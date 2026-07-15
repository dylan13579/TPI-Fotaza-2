const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/notificacionController');

router.get('/', authMiddleware, controller.ver);


module.exports = router;