export default class BaseApiClass {
  _paiBase = '/api/';
  _requestToApi = async (method, url, data, requestHeaders) => {
    let headers;
    if (['POST', 'PATCH', 'DELETE'].includes(method)) {
      headers = { ...requestHeaders, 'Content-Type': 'application/json;charset=utf-8' };
    } else {
      headers = { ...requestHeaders };
    }
    const body = Object.keys(data).length !== 0 ? JSON.stringify(data) : null;
    const request = await fetch(`${this._paiBase}${url}`, {
      method,
      headers,
      body,
    });
    if (!request.ok) {
      throw new Error(`Ошибка ${request.massage}`);
    }
    return await request.json();
  };
  _headerWithToken = (token) => ({
    Authentication: `token ${token}`,
  });
}
