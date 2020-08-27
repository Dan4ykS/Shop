const v = require('voca');

module.exports.convertDataForClient = (data, type = 'default') => {
  for (const key in data) {
    if (key === '_id' && type === 'user') {
      delete data[key];
    }
    if (type === 'deleteReviews' && key === 'reviews') {
      delete data[key];
    }
    if (key === 'reviews' && type !== 'deleteReviews') {
      const reviews = data[key].map((review) => {
        const differentField = {};
        if (type === 'user') {
          differentField.commodityId = review.commodityId._id;
          differentField.commodityImg = review.commodityId.previewImg.previewImgSrc;
          differentField.commodityTitle = review.commodityId.title;
        } else {
          differentField.reviewerName = review.userId.fullName;
          differentField.reviewer = review.userId.userName;
          differentField.reviewerAvatar = review.userId.avatar;
          differentField.reviewDate = review.date;
        }
        return {
          reviewId: review._id,
          ...differentField,
          review: review.review,
          reviewRating: review.rating,
        };
      });
      delete data[key];
      data.reviews = reviews;
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



module.exports.convertArrayForClient = (data, options) => {
  return data.map((el) => this.convertDataForClient(el.toObject(), options));
};

module.exports.toTitleCase = (str) => v.titleCase(str, [' ']);
