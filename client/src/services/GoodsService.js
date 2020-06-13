import BaseApiClass from './BaseApiClass';

class GoodsService extends BaseApiClass {
  getGoods = async () => {
    return await this.requestToApi('GET', 'getGoods', null);
  };

  loadCart = async (token) => {
    return await this.requestToApi('GET', 'getUserCart', null, this.headerWithToken(token));
  };

  addToCart = async (id, token) => {
    return await this.requestToApi('PATCH', `addToCart/${id}`, null, this.headerWithToken(token));
  };

  removeFormCart = async (id, token) => {
    return await this.requestToApi('DELETE', `removeFormCart/${id}`, null, this.headerWithToken(token));
  };

  getCommodity = async (id, token) => {
    return await this.requestToApi('GET', `findCommodity/${id}`, null, this.headerWithToken(token));
  };
}

export default new GoodsService();
