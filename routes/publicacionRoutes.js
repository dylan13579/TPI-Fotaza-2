const router = require('express').Router();

const authMiddleware =
    require('../middlewares/authMiddleware');

const publicacionController =
    require('../controllers/publicacionController');

router.get(
    '/',
    publicacionController.listar
);

router.get(
    '/crear',
    authMiddleware,
    publicacionController.crearView
);

router.post(
    '/crear',
    authMiddleware,
    publicacionController.crear
);

module.exports = router;