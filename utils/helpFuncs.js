const path = require('path');
const fs = require('fs');

const deleteFile = (fileName) => {
  fs.unlink(path.join(__dirname, '..', 'uploads', fileName), (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`Файл: ${fileName} успешно удален!`);
  });
};

const findFileNameAndExtension = (originalname) => {
  const arr = originalname.split('.');
  const fileExtension = arr[arr.length - 1];
  const fileName = arr.filter((el) => el !== fileExtension).join(' ');
  return { fileName, fileExtension };
};

const createObjForUpdateImg = (src, type, alt, oldId) => {
  return {
    [`${type}Src`]: src,
    [`${type}Alt`]: alt ? createAltForImg(alt) : createAltForImg(),
    [`${type}Id`]: oldId,
  };
};

const createDataUpdateObj = (updateData, { previewImg, img }, oldData) => {
  if (previewImg && img) {
    return {
      ...updateData,
      previewImg: createObjForUpdateImg(
        previewImg[0].path,
        'previewImg',
        updateData?.previewImgAlt,
        oldData.previewImg.previewImgId
      ),
      img: createObjForUpdateImg(img[0].path, 'img', updateData?.imgAlt, oldData.img.imgId),
    };
  } else if (img) {
    return {
      ...updateData,
      img: createObjForUpdateImg(img[0].path, 'img', updateData?.imgAlt, oldData.img.imgId),
    };
  } else if (previewImg) {
    return {
      ...updateData,
      previewImg: createObjForUpdateImg(
        previewImg[0].path,
        'previewImg',
        updateData?.previewImgAlt,
        oldData.previewImg.previewImgId
      ),
    };
  } else {
    const previewImgAlt = updateData?.previewImgAlt;
    const imgAlt = updateData?.imgAlt;
    if (previewImgAlt) {
      delete updateData.previewImgAlt;
    }
    if (imgAlt) {
      delete updateData.imgAlt;
    }
    return {
      ...updateData,
      img: imgAlt
        ? {
            ...oldData.img,
            imgAlt: createAltForImg(imgAlt),
          }
        : oldData?.img,
      previewImg: previewImgAlt
        ? {
            ...oldData.previewImg,
            previewImgAlt: createAltForImg(previewImgAlt),
          }
        : oldData?.previewImg,
    };
  }
};

const convertDataForClient = (data) => {
  const dataObj = data.toObject();
  const id = dataObj._id;
  delete dataObj.__v;
  delete dataObj._id;
  return {
    id,
    ...dataObj,
  };
};

const convertDataArrayForClient = (data) => {
  return data.map((el) => convertDataForClient(el));
};

module.exports = {
  createDataUpdateObj,
  deleteFile,
  convertDataArrayForClient,
  convertDataForClient,
  findFileNameAndExtension,
};
