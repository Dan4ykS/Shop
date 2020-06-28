const path = require('path');
const fs = require('fs');
const voca = require('voca');

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

const createFileName = (fileName, fileExtension) => {
  const date = moment().format('DDMMYYYY-HHmmss_SSS');
  return `${date}-${voca(fileName).snakeCase().latinise().value()}.${fileExtension}`;
};

module.exports = { deleteFile, findFileNameAndExtension, createFileName }

