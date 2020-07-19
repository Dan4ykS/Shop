const v = require('voca');

module.exports.convertDataForClient = (data) => {
  for (const key in data) {
    if (key === '_id') {
      data.id = data[key];
      delete data[key];
    }
    if (key === '__v') {
      delete data[key];
    }
    if (key === 'createdDate') {
      delete data[key]
    }
  }
  return data;
};

module.exports.convertArrayForClient = (data, populatedData = false) => {
  if (populatedData) {
    return data.map((el) => this.convertDataForClient(el._doc));
  } else {
    return data.map((el) => this.convertDataForClient(el.toObject()));
  }
};

module.exports.toTitleCase = (str) => v.titleCase(str, [' ']);
