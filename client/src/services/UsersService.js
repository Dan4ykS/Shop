export default class UsersService {
  _paiBase = '/api/';
  requestToApi = async (url, data) => {
    const request = await fetch(`${this._paiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    if (!request.ok) {
      throw new Error(`Ошибка ${request.massage}`);
    }
    return await request.json();
  };

  createUser = async (data) => {
    return await this.requestToApi('createUser', data);
  };

  authUser = async (data) => {
    return await this.requestToApi('authUser', data);
  };

  getUserById = async (id) => {
    return await this.requestToApi('getUser', id);
  };
}
