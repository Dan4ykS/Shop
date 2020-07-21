import BaseApiClass from './BaseApiClass';

class GoodsService extends BaseApiClass {
  getGoods = async (offset, limit) => {
    return await this.requestToApi('GET', `getGoods?offset=${offset}&limit=${limit}`, null);
  };

  loadCart = async (token) => {
    return await this.requestToApi('GET', 'getUserCart', null, this.headerWithToken(token));
  };

  addToCart = async (id, token) => {
    return await this.requestToApi('PATCH', `addToCart/${id}`, null, this.headerWithToken(token));
  };

  removeFromCart = async (id, token) => {
    return await this.requestToApi('DELETE', `removeFromCart/${id}`, null, this.headerWithToken(token));
  };

  getCommodity = async (id, token) => {
    return await this.requestToApi('GET', `findCommodity/${id}`, null, this.headerWithToken(token));
  };

  updateCommodity = async (id, data, token) => {
    return await this.requestToApi('PATCH', `updateCommodity/${id}`, data, this.headerWithToken(token));
  };

  createCommodity = async (data, token) => {
    return this.requestToApi('POST', 'createCommodity', data, this.headerWithToken(token));
  };

  removeCommodity = async (id, token) => {
    return this.requestToApi('DELETE', `removeCommodity/${id}`, null, this.headerWithToken(token));
  };

  findGoods = async (q, offset = 0, limit = 5) => {
    return this.requestToApi('GET', `findGoods?q=${q}&offset=${offset}&limit=${limit}`, null);
  };
}

export default new GoodsService();
