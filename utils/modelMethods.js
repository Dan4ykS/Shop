module.exports.addNewCommodity = async function (commodityId) {
  const index = this.goods.findIndex((commodity) => commodity.toString() === commodityId);
  if (index === -1) {
    this.goods.push(commodityId);
  }
  return await this.save();
};

module.exports.removeCommodity = async function (commodityId) {
  const index = this.goods.findIndex((commodity) => commodity.toString() === commodityId);
  if (index !== -1) {
    this.goods.splice(index, 1);
  }
  return await this.save();
};

module.exports.addToCart = async function (commodity) {
  const index = this.cart.cartItems.findIndex((item) => item.commodityId.toString() === commodity._id.toString());
  if (index === -1) {
    this.cart.cartItems.push({
      commodityId: commodity._id,
      price: commodity.price,
    });
  } else {
    this.cart.cartItems[index].copies += 1;
    this.cart.cartItems[index].price += commodity.price;
  }
  this.cart.totalPrice += commodity.price;
  return await this.save();
};

module.exports.removeFromCart = async function (commodity) {
  const index = this.cart.cartItems.findIndex((item) => item.commodityId.toString() === commodity._id.toString());
  if (this.cart.cartItems[index].copies !== 1) {
    this.cart.cartItems[index].copies -= 1;
    this.cart.cartItems[index].price -= commodity.price;
  } else {
    this.cart.cartItems.splice(index, 1);
  }
  this.cart.totalPrice -= commodity.price;
  return await this.save();
};

module.exports.updateCartPrices = async function (newPrice, commodityId) {
  const commodityIndex = this.cart.cartItems.findIndex((cartItem) => cartItem.commodityId.toString() === commodityId);
  this.cart.cartItems[commodityIndex].price = newPrice * this.cart.cartItems[commodityIndex].copies;
  this.cart.totalPrice = this.cart.cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);
  this.cart.updatedPrice = true;
  return await this.save();
};

const updateGeneralRating = ({ fiveStars, fourStars, threeStars, twoStars, oneStar }) => {
  const numberOfRatings = fiveStars + fourStars + threeStars + twoStars + oneStar;
  const sumOfRatings = fiveStars * 5 + fourStars * 4 + threeStars * 3 + twoStars * 2 + oneStar * 1;
  return sumOfRatings && numberOfRatings ? (sumOfRatings / numberOfRatings).toFixed(1) : 0;
};

module.exports.updateRating = async function (userRating, oldUserRating = null) {
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

module.exports.updateReviewsData = async function (reviewId) {
  const reviewIndex = this.reviews.findIndex((id) => id.toString() === reviewId.toString());
  if (reviewIndex === -1) {
    this.reviews.push(reviewId);
    this.countReviews += 1;
  } else {
    this.reviews.splice(reviewIndex, 1);
    this.countReviews -= 1;
  }
  return await this.save();
};

module.exports.updateCommodityList = async function (commodityId) {
  const commodityIndex = this.goods.findIndex((id) => id.toString() === commodityId);
  if (commodityIndex === -1) {
    this.goods.push(commodityId);
    this.goodsCount += 1;
  } else {
    this.goods.splice(commodityIndex, 1);
    this.goodsCount -= 1;
  }
  return await this.save();
};

module.exports.buyCommodity = async function (commodityId) {
  const commodityIndex = this.boughtGoods.findIndex((id) => id.toString() === commodityId);
  if (commodityIndex === -1) {
    this.boughtGoods = [commodityId, ...this.boughtGoods];
  }
  return await this.save();
};

module.exports.buyGoodsInCart = async function () {
  const cart = this.cart,
    oldBoughtGoods = this.boughtGoods;

  cart.cartItems.forEach((commodity, index) => {
    const commodityPrice = commodity.price;
    this.boughtGoods = [commodity.commodityId, ...oldBoughtGoods];
    cart.totalPrice -= commodityPrice;
  });
  cart.cartItems = [];
  return await this.save();
};
