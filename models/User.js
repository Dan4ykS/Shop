const { Schema, model } = require('mongoose');

const user = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cart: {
    cartItems: [
      {
        copies: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        commodityId: {
          type: Schema.Types.ObjectId,
          ref: 'Goods',
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    updatedPrice: {
      type: Boolean,
      default: false,
    },
  },
});

user.methods.addToCart = async function (commodity) {
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

user.methods.removeFormCart = async function (commodity) {
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

user.methods.updateCartPrices = async function (newPrice, commodityId) {
  const commodityIndex = this.cart.cartItems.findIndex((cartItem) => cartItem.commodityId.toString() === commodityId);
  this.cart.cartItems[commodityIndex].price = newPrice * this.cart.cartItems[commodityIndex].copies;
  this.cart.totalPrice = this.cart.cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);
  this.cart.updatedPrice = true;
  return await this.save();
};

user.methods.testData = async function (data) { 
  console.log(data)
  return await this.save()
}

module.exports = model('User', user);
