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
    return await this.requestToApi('GET', 'isValid', {}, this.headerWithToken(token));
  };
  resetPassword = async (email) => {
    return await this.requestToApi('POST', 'resetPassword', email);
  };
  createNewPassword = async (token, password) => {
    return await this.requestToApi('PATCH', 'createNewPassword', password, this.headerWithToken(token));
  };
  testData = async (data) => {
    console.log(data)
    const req = await fetch(`${this._paiBase}testData`, {
      method: 'POST',
      body: data,
    });
    return await req.json();
  };
}

export default new UsersService();
