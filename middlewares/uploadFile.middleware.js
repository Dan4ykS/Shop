const multer = require('multer');
const { findFileNameAndExtension, createFileName } = require('../utils/helpFuncs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const { fileName, fileExtension } = findFileNameAndExtension(file.originalname);
    cb(null, createFileName(fileName, fileExtension));
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
