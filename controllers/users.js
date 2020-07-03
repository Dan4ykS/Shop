const sendRegistationLetter = require('../mail/registation');
const sendResetPasswordLetter = require('../mail/resetPassword');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const Reviews = require('../models/Reviews');
const Goods = require('../models/Goods');
const { createJwtToken } = require('../utils/createFuncs');
const { updateCommodityRating } = require('../utils/updateFuncs');
const { deleteFile, getValidFileName } = require('../utils/workWithFiles');

module.exports.createUser = async ({ body: { userName, password, email } }, res) => {
  try {
    const newUser = new Users({
      userName,
      password: await bcrypt.hash(password, 10),
      email,
      cart: {
        cartItems: [],
        totalPrice: 0,
      },
    });
    await newUser.save();
    const token = createJwtToken({ userId: newUser.id }, '1d');
    res.status(201).json(token);
    await sendRegistationLetter(email, userName);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    res.json(await Users.find());
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.authUser = async ({ body: { userName, password } }, res) => {
  try {
    const user = await Users.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: 'Такого пользователя нет' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }
    const token = createJwtToken({ userId: user.id }, '1d');
    res.json(token);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.isValid = async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ message: 'Извините, но такого пользователя уже нет' });
    }
    const newToken = createJwtToken({ userId: user.id }, '1d');
    res.json({ userName: user.userName, cart: user.cart, newToken });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.addToCart = async (req, res) => {
  try {
    const commodity = await Goods.findById(req.params.id),
      user = await Users.findById(req.user.userId);

    await user.addToCart(commodity);
    res.json({ message: 'Товар добавлен' });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.removeFromCart = async (req, res) => {
  try {
    const commodity = await Goods.findById(req.params.id),
      user = await Users.findById(req.user.userId);

    await user.removeFromCart(commodity);
    res.json({ message: 'Товар удален' });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getUserCart = async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId),
      userCartData = await user.populate('cart.cartItems.commodityId').execPopulate(),
      userCart = userCartData.cart.cartItems.map((item) => {
        const id = item.commodityId.id,
          imgSrc = item.commodityId._doc.previewImg.previewImgSrc,
          alt = item.commodityId._doc.previewImg.previewImgAlt,
          title = item.commodityId._doc.title;
        return {
          id,
          copies: item.copies,
          price: item.price,
          imgSrc,
          alt,
          title,
        };
      });

    res.json({
      userCart,
      totalPrice: user.cart.totalPrice,
      updatedPrice: user.cart.updatedPrice,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.resetPassword = async ({ body: { email } }, res) => {
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неверная почта' });
    }
    const token = createJwtToken({ userId: user.id });
    res.status(201).json({ message: 'Токен для восстановления пароля создан' });
    await sendResetPasswordLetter(email, token);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.createNewPassword = async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId);
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    res.status(201).json({ message: 'Пароль изменен' });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateUserData = async ({ body, user: { userId }, file }, res) => {
  try {
    const newAvatar = {},
      newPassword = {};

    if (file) {
      newAvatar.avatar = file.path;
    }
    if (body?.password) {
      newPassword.password = await bcrypt.hash(body.password, 10);
    }
    await Users.findByIdAndUpdate(userId, { ...body, ...newAvatar, ...newPassword });
    res.status(200).json({ message: `Данные пользователя с id: ${userId} обновлены` });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.removeUser = async ({ params: { id } }, res) => {
  try {
    const oldUser = await Users.findByIdAndDelete(id);
    res.status(200).json({ message: `Данные пользователя с id: ${id} удалены` });
    const userReviews = await Reviews.find({ user: id });
    if (userReviews.length > 0) {
      userReviews.forEach(async (review) => {
        const reviewData = await Reviews.findByIdAndRemove(review._id.toString());
        await updateCommodityRating(reviewData.commodity, 0, reviewData?.rating);
      });
    }
    if (oldUser?.avatar && getValidFileName(oldUser.avatar) !== 'defaultAvatar.png') {
      deleteFile(getValidFileName(oldUser.avatar));
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
