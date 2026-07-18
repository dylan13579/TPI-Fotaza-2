const router = require('express').Router();

const adminMiddleware = require('../middlewares/adminMiddleware');
const denunciaModel = require('../models/denunciaModel');
const adminController = require('../controllers/adminController');

router.get(
    '/denuncias',
    adminMiddleware,
    async (req, res) => {
        try {
            const denuncias = await denunciaModel.obtenerTodas();
            res.render('admin/denuncia', { denuncias });
        } catch (error) {
            console.log(error);
            res.render('admin/denuncia', { denuncias: [] });
        }
    }
);

router.post(
    '/publicacion/:id/liberar',
    adminMiddleware,
    adminController.liberarPublicacion
);

module.exports = router;