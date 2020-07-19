const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const authAdmin = require('../middlewares/authAdmin.middleware');
const uploadFile = require('../middlewares/uploadFile.middleware');
const controller = require('../controllers/users');

const router = Router();

router.post('/createUser', controller.createUser);

router.get('/getUsers', authAdmin, controller.getUsers);

router.get('/getUserData', auth, controller.getUserData);

router.get('/getAdminData', controller.getAdminData);

router.post('/authUser', controller.authUser);

router.get('/isValid', auth, controller.isValid);

router.patch('/addToCart/:id', auth, controller.addToCart);

router.delete('/removeFromCart/:id', auth, controller.removeFromCart);

router.get('/buyGoods', auth, controller.buyGoods);

router.get('/getUserCart', auth, controller.getUserCart);

router.post('/resetPassword', controller.resetPassword);

router.patch('/createNewPassword', auth, controller.createNewPassword);

router.patch('/updateUserData', auth, uploadFile.single('avatar'), controller.updateUserData);

router.delete('/removeUser/:id', authAdmin, controller.removeUser);

module.exports = router;
