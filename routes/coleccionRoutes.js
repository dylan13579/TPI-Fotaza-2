const router = require('express').Router();

const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/coleccionController');

router.post(
    '/crear',
    auth,
    controller.crear
);

router.post(
    '/agregar',
    auth,
    controller.agregar
);

router.get(
    '/:id',
    auth,
    controller.ver
);

module.exports = router;