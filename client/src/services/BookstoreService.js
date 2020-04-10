// import axios from 'axios';

export default class BookStoreService {
  _paiBase = 'api/';

  // requestToApi = async (url, data) => {
  //   cosnst
  //  };

  getBooks = async (token) => {
    const request = await fetch('/api/getGoods');
    if (!request.ok) {
       throw new Error(`Ошибка ${request.massage}`);
    }
    return await request.json();
  };

  getCartItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 1) {
          reject(new Error('Что то пошло не так'));
        } else {
          resolve(this.cartItems);
        }
      }, 700);
    });
  }
}
