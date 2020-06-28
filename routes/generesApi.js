const { Router } = require('express');
const authAdmin = require('../middlewares/authAdmin.middleware');
const errorHandler = require('../utils/errorHandler');
const Genres = require('../models/Genres');
const { convertDataArrayForClient } = require('../utils/convertFuncs');

const router = Router();

router.post('/createGenre', authAdmin, async ({ body: { genre, commodityId } }, res) => {
  try {
    const newgenre = new Genres({
      genre,
      goods: [{ commodityId }],
    });
    await newgenre.save();
    res.status(201).json(`Создан новый жанр: ${genre}`);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch('/addNewBookForGenre', authAdmin, async ({ body: { genreId, commodityId } }, res) => {
  try {
    const genreData = await Genres.findById(genreId);
    await genreData.addNewCommodity(commodityId);
    res.status(200).json({ message: `Товар с id ${commodityId} добавлен в список для жанра ${genreData.genre}` });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete('/removeBookForGenre', authAdmin, async ({ body: { genreId, commodityId } }, res) => {
  try {
    const genreData = await Genres.findById(genreId);
    await genreData.removeCommodity(commodityId);
    res.status(200).json({ message: `Товар с id ${commodityId} удален из списка для жанра ${genreData.genre}` });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/getGenres', async (req, res) => {
  try {
    const genres = await Genres.find();
    res.json({ genres: convertDataArrayForClient(genres) });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
