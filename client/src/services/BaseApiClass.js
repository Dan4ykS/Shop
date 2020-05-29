export default class BaseApiClass {
  #apiBase = '/api/';
  requestToApi = async (method, url, data, requestHeaders) => {
    let headers;
    if (['POST', 'PATCH', 'DELETE'].includes(method)) {
      headers = { ...requestHeaders, 'Content-Type': 'application/json;charset=utf-8' };
    } else {
      headers = { ...requestHeaders };
    }
    const body = Object.keys(data).length !== 0 ? JSON.stringify(data) : null;
    const request = await fetch(`${this.#apiBase}${url}`, {
      method,
      headers,
      body,
    });
    if (!request.ok) {
      const { message } = await request.json()
      throw new Error(`Ошибка ${message}`);
    }
    return await request.json();
  };
  headerWithToken = (token) => ({
    Authentication: `token ${token}`,
  });
}
