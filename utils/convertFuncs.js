module.exports.convertDataForClient = (data) => {
  const id = data._id;
  delete data.__v;
  delete data._id;
  return {
    id,
    ...data,
  };
};

module.exports.convertDataArrayForClient = (data) => {
  return data.map((el) => convertDataForClient(el.toObject()));
};
