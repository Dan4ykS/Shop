import BaseApiClass from './BaseApiClass';

class GoodsService extends BaseApiClass {
  getGoods = async (offset = 0, limit = 8) => {
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

  findGoods = async (q, offset = 0, limit = 8) => {
    return this.requestToApi('GET', `findGoods?q=${q}&offset=${offset}&limit=${limit}`, null);
  };

  getPopularGoods = async (offset = 0, limit = 8) => {
    return this.requestToApi('GET', `popularGoods?offset=${offset}&limit=${limit}`, null);
  };

  getNewGoods = async (offset = 0, limit = 8) => {
    return this.requestToApi('GET', `newGoods?offset=${offset}&limit=${limit}`, null);
  };

  getBestGoods = async (offset = 0, limit = 8) => {
    return this.requestToApi('GET', `bestGoods?offset=${offset}&limit=${limit}`, null);
  };

  getSimilarGoods = async (commodityId) => {
    return this.requestToApi('GET', `getSimilarGoods/${commodityId}`, null);
  };

  createReview = async (data, toke) => {
    return this.requestToApi('POST', 'createReview', data, this.headerWithToken(toke));
  };

  updateReview = async (id, data, token) => {
    return this.requestToApi('PATCH', `updateReview/${id}`, data, this.headerWithToken(token));
  };

  removeReview = async (id, token) => {
    return this.requestToApi('DELETE', `removeReview/${id}`, null, this.headerWithToken(token));
  };
}

export default new GoodsService();
