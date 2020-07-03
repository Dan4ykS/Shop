const errorHandler = require('../utils/errorHandler');
const Authors = require('../models/Authors');
const { deleteFile, getValidFileName } = require('../utils/workWithFiles');

module.exports.createAuthor = async ({ body: { author, aboutAuthor = null }, file }, res) => {
  try {
    const newAuthor = new Authors({
      author,
      authorImg: file.path,
      aboutAuthor: !aboutAuthor ? null : aboutAuthor,
    });
    await newAuthor.save();
    res.status(201).json({ message: `Создан новый автор - ${author}` });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateAuthor = async ({ body, params: { id }, file }, res) => {
  try {
    const newAuthorImgSrc = {};
    if (file) {
      newAuthorImgSrc.authorImg = file.path;
    }
    const oldAuthorData = await Authors.findByIdAndUpdate(id, { ...body, ...newAuthorImgSrc });
    res.status(200).json({ message: `Данные об авторе с ID: ${id} обновлены` });
    if (file && getValidFileName(oldAuthorData.authorImg) !== 'defaultAuthorImg.png') {
      deleteFile(getValidFileName(oldAuthorData.authorImg));
    }
  } catch (error) {
    errorHandler(res, error);
  }
};