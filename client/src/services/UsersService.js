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
  testData = async (data, token) => {
    console.log(data)
    return await this.requestToApi('PATCH', 'updateCommodity/5e84c883e2286534184940dc', data, this.headerWithToken(token));
  };
}

export default new UsersService();
