const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.createObjForUpdateImg = (src, type, alt, oldId, newId) => {
  return {
    [`${type}Src`]: src,
    [`${type}Alt`]: alt,
    [`${type}Id`]: !newId ? oldId : newId,
  };
};

const createObjForUpdateAlt = (oldImgDta, newAlt, type) => {
  return {
    ...oldImgDta,
    [`${type}Alt`]: newAlt,
  };
};

module.exports.createDataUpdateObj = (updateData, { previewImg, img }, oldData) => {
  if (previewImg && img) {
    return {
      ...updateData,
      previewImg: createObjForUpdateImg(
        previewImg[0].path,
        'previewImg',
        updateData.previewImgAlt,
        oldData.previewImg.previewImgId
      ),
      img: createObjForUpdateImg(img[0].path, 'img', updateData.imgAlt, oldData.img.imgId),
    };
  } else if (img) {
    return {
      ...updateData,
      img: createObjForUpdateImg(img[0].path, 'img', updateData.imgAlt, oldData.img.imgId, updateData?.imgId),
      previewImg: !updateData.previewImgAlt
        ? oldData.previewImg
        : createObjForUpdateAlt(oldData.previewImg, updateData.previewImgAlt, 'previewImg'),
    };
  } else if (previewImg) {
    return {
      ...updateData,
      previewImg: createObjForUpdateImg(
        previewImg[0].path,
        'previewImg',
        updateData.previewImgAlt,
        oldData.previewImg.previewImgId
      ),
      img: !updateData.imgAlt ? oldData.img : createObjForUpdateAlt(oldData.img, updateData.imgAlt, 'img'),
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
      img: imgAlt ? createObjForUpdateAlt(oldData.img, imgAlt, 'img') : oldData.img,
      previewImg: previewImgAlt
        ? createObjForUpdateAlt(oldData.previewImg, previewImgAlt, 'previewImg')
        : oldData.previewImg,
    };
  }
};

module.exports.generateDate = () => {
  return moment().format('DD:MM:YYYY-HH:mm:ss');
};

module.exports.createJwtToken = (data, lifetime = '1h') => {
  return jwt.sign(data, config.JWTSECRET, { expiresIn: lifetime });
};

module.exports.createPopuldatedData = async (data, pathForPopulate) => {
  return await data.populate(pathForPopulate).execPopulate();
};

module.exports.createArrWithoutCopies = (firstArr, secondArr) => {
  for (const el of firstArr) {
    const duplicateIndex = secondArr.findIndex((elem) => elem?.id?.toString() === el.id.toString());
    if (duplicateIndex !== -1) {
      secondArr.splice(duplicateIndex, 1);
    }
  }
  return [...firstArr, ...secondArr];
};