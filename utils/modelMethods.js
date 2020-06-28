async function addNewCommodity(commodityId) {
  const index = this.goods.findIndex((commodity) => commodity.commodityId.toString() === commodityId);
  if (index === -1) {
    this.goods.push({ commodityId });
  }
  return await this.save();
}

async function removeCommodity(commodityId) {
  const index = this.goods.findIndex((commodity) => commodity.commodityId.toString() === commodityId);
  if (index !== -1) {
    this.goods.splice(index, 1);
  }
  return await this.save();
}

async function addToCart(commodity) {
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
}

async function removeFromCart(commodity) {
  const index = this.cart.cartItems.findIndex((item) => item.commodityId.toString() === commodity._id.toString());
  if (this.cart.cartItems[index].copies !== 1) {
    this.cart.cartItems[index].copies -= 1;
    this.cart.cartItems[index].price -= commodity.price;
  } else {
    this.cart.cartItems.splice(index, 1);
  }
  this.cart.totalPrice -= commodity.price;
  return await this.save();
}

async function updateCartPrices(newPrice, commodityId) {
  const commodityIndex = this.cart.cartItems.findIndex((cartItem) => cartItem.commodityId.toString() === commodityId);
  this.cart.cartItems[commodityIndex].price = newPrice * this.cart.cartItems[commodityIndex].copies;
  this.cart.totalPrice = this.cart.cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);
  this.cart.updatedPrice = true;
  return await this.save();
}

const updateGeneralRating = ({ fiveStars, fourStars, threeStars, twoStars, oneStar }) => {
  const numberOfRatings = fiveStars + fourStars + threeStars + twoStars + oneStar;
  const sumOfRatings = fiveStars * 5 + fourStars * 4 + threeStars * 3 + twoStars * 2 + oneStar * 1;
  return sumOfRatings && numberOfRatings ? (sumOfRatings / numberOfRatings).toFixed(2) : 0;
};

async function updateRating(userRating, oldUserRating = null) {
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
}

module.exports = {
  addNewCommodity,
  removeCommodity,
  addToCart,
  removeFromCart,
  updateCartPrices,
  updateRating,
};
