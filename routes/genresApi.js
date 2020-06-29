const { Router } = require('express');
const authAdmin = require('../middlewares/authAdmin.middleware');
const controller = require('../controllers/genres');

const router = Router();

router.post('/createGenre', authAdmin, controller.createGenre);

router.get('/getGenres', controller.getGenres);

module.exports = router;
