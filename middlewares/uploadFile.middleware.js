const multer = require('multer');
const moment = require('moment');
const voca = require('voca');
const { findFileNameAndExtension } = require('../utils/helpFuncs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    const { fileName, fileExtension } = findFileNameAndExtension(file.originalname);
    cb(null, `${date}-${voca(fileName).snakeCase().latinise().value()}.${fileExtension}`);
  },
});
const fileFilter = (req, file, cb) => {
  const validFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (validFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
