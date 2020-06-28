const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const createObjForUpdateImg = (src, type, alt, oldId, newId) => {
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

const createDataUpdateObj = (updateData, { previewImg, img }, oldData) => {
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
      previewImg: previewImgAlt ? createObjForUpdateAlt(oldData.previewImg, previewImgAlt, 'previewImg') : oldData.previewImg,
    };
  }
};

const generateDate = () => {
  return moment().format('DD:MM:YYYY-HH:mm:ss');
};

const createJwtToken = (data, lifetime = '1h') => {
  return jwt.sign(data, config.JWTSECRET, { expiresIn: lifetime });
};


module.exports = {
  createDataUpdateObj,
  generateDate,
  createJwtToken
};
