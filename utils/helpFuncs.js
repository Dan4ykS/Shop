const path = require('path');
const fs = require('fs');
const moment = require('moment');
const voca = require('voca');
const Goods = require('../models/Goods');

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

const convertDataForClient = (data) => {
  const id = data._id;
  delete data.__v;
  delete data._id;
  return {
    id,
    ...data,
  };
};

const convertDataArrayForClient = (data) => {
  return data.map((el) => convertDataForClient(el.toObject()));
};

const generateDate = () => {
  return moment().format('DD:MM:YYYY-HH:mm:ss');
};

const createFileName = (fileName, fileExtension) => {
  const date = moment().format('DDMMYYYY-HHmmss_SSS');
  return `${date}-${voca(fileName).snakeCase().latinise().value()}.${fileExtension}`;
};

const updateCommodityRating = async (commodityId, newRating, oldRating = null) => {
  if (+newRating >= 0 && +newRating < 6) {
    const reviewCommodity = await Goods.findById(commodityId);
    await reviewCommodity.updateRating(+newRating, +oldRating);
  }
  return;
};

module.exports = {
  createDataUpdateObj,
  deleteFile,
  convertDataArrayForClient,
  convertDataForClient,
  findFileNameAndExtension,
  generateDate,
  createFileName,
  updateCommodityRating,
};
