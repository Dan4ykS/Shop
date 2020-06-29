const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/reviews');

const router = Router();

router.post('/createReview', auth, controller.createReview);

router.patch('/updateReview/:id', auth, controller.updateReview);

router.delete('/removeReview/:id', auth, controller.removeReview);

module.exports = router;
