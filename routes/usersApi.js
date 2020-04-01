const { Router } = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const sendRegistationLetter = require('../mail/registation');
const auth = require('../middleware/auth.middleware');
const createJwtToken = require('../utils/createJwtToken');

const router = Router();

router.post('/createUser', async (req, res) => {
  const newUser = new Users({
    userName: req.body.userName,
    password: await bcrypt.hash(req.body.password, 10),
    email: req.body.email,
  });
  try {
    await newUser.save();
    const token = createJwtToken({userId: newUser.id});
    res.status(201).json({ token, userName: newUser.userName });
    await sendRegistationLetter(req.body.email, req.body.userName);
  } catch (error) {
    res.sendStatus(400);
    throw error;
  }
});

router.get('/getUsers', auth, async (req, res) => {
  try {
    res.json(await Users.find());
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post('/authUser', async (req, res) => {
  try {
    const user = await Users.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(400).json({ message: 'Такого пользователя нет' });
    }
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }
    const token = createJwtToken({ userId: user.id })
    res.json({ token, userName: user.userName });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка запроса авторизации' });
    throw error;
  }
});

module.exports = router;
