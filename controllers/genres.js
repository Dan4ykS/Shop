const errorHandler = require('../utils/errorHandler');
const Genres = require('../models/Genres');
const { convertDataArrayForClient } = require('../utils/convertFuncs');

module.exports.createGenre = async ({ body: { genre, commodityId } }, res) => {
  try {
    const newgenre = new Genres({
      genre,
      goods: [{ commodityId }],
    });
    await newgenre.save();
    res.status(201).json({ message: `Создан новый тэг: ${genre}` });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getGenres = async (req, res) => {
  try {
    const genres = await Genres.find();
    res.json({ genres: convertDataArrayForClient(genres) });
  } catch (error) {
    errorHandler(res, error);
  }
};