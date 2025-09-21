/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function createRequest({ url, data = {}, method = 'GET', callback = () => {} }) {
  if (!url) {
    throw new Error('URL обязателен для createRequest');
  }

  const xhr = new XMLHttpRequest();
  const httpMethod = method.toUpperCase();

  let requestUrl = url;
  let requestData = null;

  if (httpMethod === 'GET' && data && Object.keys(data).length > 0) {
    // Добавляем данные в строку запроса
    const params = new URLSearchParams(data).toString();
    requestUrl += (url.includes('?') ? '&' : '?') + params;
  } else if (httpMethod !== 'GET' && data && Object.keys(data).length > 0) {
    // Формируем FormData для передачи
    requestData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        requestData.append(key, data[key]);
      }
    }
  }

  xhr.open(httpMethod, requestUrl, true);
  xhr.responseType = 'json';

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      callback({
        status: xhr.status,
        statusText: xhr.statusText,
        response: xhr.response,
      }, null);
    }
  };

  xhr.onerror = function () {
    callback({
      status: xhr.status,
      statusText: xhr.statusText,
      response: null,
    }, null);
  };

  xhr.send(requestData);
}