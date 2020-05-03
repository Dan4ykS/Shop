const { Router } = require('express');
const User = require('../models/User');
const Goods = require('../models/Goods');
const bcrypt = require('bcryptjs');
const sendRegistationLetter = require('../mail/registation');
const auth = require('../middleware/auth.middleware');
const createJwtToken = require('../utils/createJwtToken');
const errorHandler = require('../utils/errorHandler');

const router = Router();

router.post('/createUser', async ({ body: { userName, password, email } }, res) => {
  const newUser = new User({
    userName,
    password: await bcrypt.hash(password, 10),
    email,
    cart: {
      cartItems: [],
      totalPrice: 0,
    },
  });
  try {
    await newUser.save();
    const token = createJwtToken({ userId: newUser.id });
    res.status(201).json({ token });
    await sendRegistationLetter(email, userName);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/getUsers', auth, async (req, res) => {
  try {
    res.json(await User.find());
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post('/authUser', async ({ body: { userName, password } }, res) => {
  try {
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json({ message: 'Такого пользователя нет' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }
    const token = createJwtToken({ userId: user.id });
    res.json({ token });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/isValid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ message: 'Извините, но такого пользователя уже нет' });
    }
    res.json({ userName: user.userName });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch('/addToCart', auth, async (req, res) => {
  try {
    const commodity = await Goods.findById(req.body.id);
    const user = await User.findById(req.user.userId);
    await user.addToCart(commodity);
    res.json({ message: 'Товар добавлен' });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete('/removeFormCart', auth, async (req, res) => {
  try {
    const commodity = await Goods.findById(req.body.id);
    const user = await User.findById(req.user.userId);
    await user.removeFormCart(commodity);
    res.json({ message: 'Товар удален' });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/getUserCart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const userCartData = await user.populate('cart.cartItems.commodityId').execPopulate();
    const userCart = userCartData.cart.cartItems.map((item) => {
      return {
        ...item.commodityId._doc,
        copies: item.copies,
        price: item.price,
      };
    });
    res.json({
      userCart,
      totalPrice: user.cart.totalPrice,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
