import BaseApiClass from './BaseApiClass';

export default class UsersService extends BaseApiClass {
  createUser = async (data) => {
    return await this._requestToApi('POST', 'createUser', data);
  };
  authUser = async (data) => {
    return await this._requestToApi('POST', 'authUser', data);
  };
  getUserById = async (id) => {
    return await this._requestToApi('POST', 'getUser', id);
  };
  checkUserValid = async (token) => {
    return await this._requestToApi('GET', 'isValid', {}, this._headerWithToken(token));
  };
  resetPassword = async (email) => {
    return await this._requestToApi('POST', 'resetPassword', email);
  };
}
