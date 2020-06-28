const { Schema, model } = require('mongoose');

const goods = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescr: {
    type: String,
    maxlength: 300,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  previewImg: {
    previewImgSrc: {
      type: String,
      required: true,
    },
    previewImgAlt: {
      type: String,
      required: true,
    },
    previewImgId: {
      type: String,
    },
  },
  img: {
    imgSrc: {
      type: String,
    },
    imgAlt: {
      type: String,
    },
    imgId: {
      type: String,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    general: {
      type: Number,
      default: 0,
    },
    fiveStars: {
      type: Number,
      default: 0,
    },
    fourStars: {
      type: Number,
      default: 0,
    },
    threeStars: {
      type: Number,
      default: 0,
    },
    twoStars: {
      type: Number,
      default: 0,
    },
    oneStar: {
      type: Number,
      default: 0,
    },
  },
  author: {
    type: String,
    require: true,
  },
});

const updateGeneralRating = ({ fiveStars, fourStars, threeStars, twoStars, oneStar }) => {
  const numberOfRatings = fiveStars + fourStars + threeStars + twoStars + oneStar;
  const sumOfRatings = fiveStars * 5 + fourStars * 4 + threeStars * 3 + twoStars * 2 + oneStar * 1;
  return (sumOfRatings / numberOfRatings).toFixed(2);
};

goods.methods.updateRating = async function (userRating, oldUserRating = null) {
  if (oldUserRating) {
    switch (oldUserRating) {
      case 5:
        this.rating.fiveStars -= 1;
        break;
      case 4:
        this.rating.fourStars -= 1;
        break;
      case 3:
        this.rating.threeStars -= 1;
        break;
      case 2:
        this.rating.twoStars -= 1;
        break;
      case 1:
        this.rating.oneStar -= 1;
        break;
      default:
        break;
    }
  }
  switch (userRating) {
    case 5:
      this.rating.fiveStars += 1;
      break;
    case 4:
      this.rating.fourStars += 1;
      break;
    case 3:
      this.rating.threeStars += 1;
      break;
    case 2:
      this.rating.twoStars += 1;
      break;
    case 1:
      this.rating.oneStar += 1;
      break;
    default:
      break;
  }
  this.rating.general = updateGeneralRating(this.rating);
  return await this.save();
};

module.exports = model('Goods', goods);
