const path = require('path');
const fs = require('fs');

const deleteFile = (fileName) => {
  fs.unlink(path.join(__dirname, '..', 'uploads', fileName), (error) => {
    if (error) {
      console.log(error);
    }
    console.log(`Файл: ${fileName} успешно удален!`);
  });
};

const createDataUpdateObj = (updateData, { previewImg, img }) => {
  if (previewImg && img) {
    return {
      ...updateData,
      previewImgSrc: previewImg[0].path,
      imgSrc: img[0].path,
    };
  } else if (img) {
    return {
      ...updateData,
      imgSrc: img[0].path,
    };
  } else if (previewImg) {
    return {
      ...updateData,
      previewImgSrc: previewImg[0].path,
    };
  } else {
    return updateData;
  }
};

module.exports = {
  createDataUpdateObj,
  deleteFile,
};
