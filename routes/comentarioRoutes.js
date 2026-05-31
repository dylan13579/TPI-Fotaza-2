const router = require('express').Router();

const comentarioController =
    require('../controllers/comentarioController');

const authMiddleware =
    require('../middlewares/authMiddleware');

router.post('/crear',authMiddleware, comentarioController.crear);

router.post('/eliminar/:id', authMiddleware, comentarioController.eliminar);

module.exports = router;