import BaseApiClass from './BaseApiClass';

export default class GoodsService extends BaseApiClass {
  getGoods = async () => {
    return await this._requestToApi('GET', 'getGoods', {});
  };

  loadCart = async (token) => {
    return await this._requestToApi('GET', 'getUserCart', {}, this._headerWithToken(token));
  };

  addToCart = async (id, token) => {
    return await this._requestToApi('PATCH', 'addToCart', id, this._headerWithToken(token));
  };

  removeFormCart = async (id, token) => {
    return await this._requestToApi('DELETE', 'removeFormCart', id, this._headerWithToken(token));
  };
}
