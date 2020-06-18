export default class BaseApiClass {
  #apiBase = '/api/';

  #setHeaders = (method, requestHeaders, data) => {
    let headers;
    if (data?.withFiles || method === 'GET') {
      headers = { ...requestHeaders };
    } else {
      headers = { ...requestHeaders, 'Content-Type': 'application/json;charset=utf-8' };
    }
    return headers;
  };

  #createBodyForRequest = (data) => {
    let body;
    if (data && data?.withFiles) {
      const formData = new FormData();
      delete data.withFiles;
      for (const key in data) {
        formData.append(key, data[key]);
      }
      body = formData;
    } else if (data && !data?.withFiles) {
      body = JSON.stringify(data);
    } else {
      body = null;
    }
    return body;
  };

  requestToApi = async (method, url, data, requestHeaders) => {
    const request = await fetch(`${this.#apiBase}${url}`, {
      method,
      headers: this.#setHeaders(method, requestHeaders, data),
      body: this.#createBodyForRequest(data),
    });
    if (!request.ok) {
      const { message } = await request.json();
      throw new Error(`Ошибка ${message}`);
    }
    return await request.json();
  };

  headerWithToken = (token) => ({
    Authentication: `token ${token}`,
  });
}
