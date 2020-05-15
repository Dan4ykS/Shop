const path = require('path');
const fs = require('fs');

const createFilesForUpdateObj = (previewImg, oldPreviewImgSrc, img, oldImgSrc) => {
  const defaultObj = {
    previewImg: null,
    img: null,
  };
  const previewImgObj = {
    newFile: previewImg ? previewImg[0] : null,
    oldPreviewImgSrc: oldPreviewImgSrc.split('\\')[1],
  };
  const imgObj = {
    newFile: img ? img[0] : null,
    oldImgSrc: oldImgSrc.split('\\')[1],
  };
  if (previewImg && img) {
    return {
      previewImg: previewImgObj,
      img: imgObj,
    };
  } else if (previewImg) {
    return {
      ...defaultObj,
      previewImg: previewImgObj,
    };
  } else if (img) {
    return {
      ...defaultObj,
      img: imgObj,
    };
  } else {
    return defaultObj;
  }
};

const deleteFile = (fileName) => {
  fs.unlink(path.join(__dirname, '..', 'uploads', fileName), (error) => {
    if (error) {
      console.log(error);
    }
    console.log('Файл успешно удален!');
  });
};

const createDataUpdateObj = (updateData, { previewImg, img }) => {
  if (previewImg && img) {
    return {
      ...updateData,
      previewImg: previewImg.newFile.path,
      img: img.newFile.path,
      filesForDelete: [previewImg.oldPreviewImgSrc, img.oldImgSrc],
    };
  } else if (img) {
    return {
      ...updateData,
      img: img.newFile.path,
      filesForDelete: [img.oldImgSrc],
    };
  } else if (previewImg) {
    return {
      ...updateData,
      previewImg: previewImg.newFile.path,
      filesForDelete: [previewImg.oldPreviewImgSrc],
    };
  } else {
    return updateData;
  }
};

module.exports = {
  createDataUpdateObj,
  createFilesForUpdateObj,
  deleteFile,
};
