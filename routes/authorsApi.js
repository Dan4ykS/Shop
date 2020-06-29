const { Router } = require('express');
const authAdmin = require('../middlewares/authAdmin.middleware');
const uploadFile = require('../middlewares/uploadFile.middleware');
const controller = require('../controllers/authors');

const router = Router();

router.post('/createAuthor', authAdmin, uploadFile.single('authorImg'), controller.createAuthor);

router.patch('/updateAuthor/:id', authAdmin, uploadFile.single('authorImg'), controller.updateAuthor);

module.exports = router;
