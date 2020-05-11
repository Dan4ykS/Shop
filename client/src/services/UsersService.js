import BaseApiClass from './BaseApiClass';

class UsersService extends BaseApiClass {
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
  createNewPassword = async (token, password) => {
    return await this._requestToApi('PATCH', 'createNewPassword', password, this._headerWithToken(token));
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
