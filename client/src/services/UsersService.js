import BaseApiClass from './BaseApiClass';

class UsersService extends BaseApiClass {
  createUser = async (data) => {
    return await this.requestToApi('POST', 'createUser', data);
  };

  authUser = async (data) => {
    return await this.requestToApi('POST', 'authUser', data);
  };

  getUserById = async (id) => {
    return await this.requestToApi('POST', 'getUser', id);
  };

  checkUserValid = async (token) => {
    return await this.requestToApi('GET', 'isValid', null, this.headerWithToken(token));
  };

  resetPassword = async (email) => {
    return await this.requestToApi('POST', 'resetPassword', email);
  };

  createNewPassword = async (token, password) => {
    return await this.requestToApi('PATCH', 'createNewPassword', password, this.headerWithToken(token));
  };

  getAdminData = async () => {
    return await this.requestToApi('GET', 'getAdminData', null);
  };

  updateUserData = async (data, token) => {
    return await this.requestToApi('PATCH', 'updateUserData', data, this.headerWithToken(token));
  };

  updateBoughtGoodsData = async (token) => {
    return await this.requestToApi('GET', 'getUserBoughtGoods', null, this.headerWithToken(token));
  };

  getUserReviews = async (token) => {
    return await this.requestToApi('GET', 'getUserReviews', null, this.headerWithToken(token));
  };

  buyGoods = async (token) => {
    return await this.requestToApi('GET', 'buyGoods', null, this.headerWithToken(token));
  };
}

export default new UsersService();
