const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const valoracionController = require('../controllers/valoracionController');

router.post(
  '/votar',
  authMiddleware,
  valoracionController.votar
);

module.exports = router;