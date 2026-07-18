const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const denunciaController = require('../controllers/denunciaController');

router.post('/crear', authMiddleware, denunciaController.crear);

router.get('/admin', adminMiddleware, denunciaController.listar);

module.exports = router;