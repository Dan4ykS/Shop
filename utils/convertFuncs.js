const v = require('voca');

module.exports.convertDataForClient = (data, type = 'default') => {
  for (const key in data) {
    if (key === '_id' && type === 'user') {
      delete data[key];
    }
    if (key === 'boughtGoods') {
      const boughtGoods = data[key].map((commodity) => ({
        id: commodity._id,
        previewImg: commodity.previewImg.previewImgSrc,
        rating: commodity.rating.general,
      }));
      delete data[key];
      data.boughtGoods = boughtGoods;
    }
    if (key === '_id') {
      data.id = data[key];
      delete data[key];
    }
    if (key === '__v') {
      delete data[key];
    }
    if (key === 'password') {
      delete data[key];
    }
    if (key === 'createdDate') {
      delete data[key];
    }
  }
  return data;
};

module.exports.convertArrayForClient = (data) => {
  return data.map((el) => this.convertDataForClient(el.toObject()));
};

module.exports.toTitleCase = (str) => v.titleCase(str, [' ']);
