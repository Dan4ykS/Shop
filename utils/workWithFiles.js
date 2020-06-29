const path = require('path');
const fs = require('fs');
const voca = require('voca');
const moment = require('moment');

module.exports.deleteFile = (fileName) => {
  fs.unlink(path.join(__dirname, '..', 'uploads', fileName), (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`Файл: ${fileName} успешно удален!`);
  });
};

module.exports.findFileNameAndExtension = (originalname) => {
  const arr = originalname.split('.');
  const fileExtension = arr[arr.length - 1];
  const fileName = arr.filter((el) => el !== fileExtension).join(' ');
  return { fileName, fileExtension };
};

module.exports.createFileName = (fileName, fileExtension) => {
  const date = moment().format('DDMMYYYY-HHmmss_SSS');
  return `${date}-${voca(fileName).snakeCase().latinise().value()}.${fileExtension}`;
};

module.exports.getValidFileName = (fileNameFormServer) => {
  return fileNameFormServer.split('\\')[1];
};
