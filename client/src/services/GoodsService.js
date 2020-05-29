import BaseApiClass from './BaseApiClass';

class GoodsService extends BaseApiClass {
  getGoods = async () => {
    return await this.requestToApi('GET', 'getGoods', {});
  };

  loadCart = async (token) => {
    return await this.requestToApi('GET', 'getUserCart', {}, this.headerWithToken(token));
  };

  addToCart = async (id, token) => {
    return await this.requestToApi('PATCH', `addToCart/${id}`, {}, this.headerWithToken(token));
  };

  removeFormCart = async (id, token) => {
    return await this.requestToApi('DELETE', `removeFormCart/${id}`, {}, this.headerWithToken(token));
  };
}

export default new GoodsService();
