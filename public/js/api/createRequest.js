
// const createRequest = (options = {}) => {
//   const {
//     url = "",
//     method = "GET",
//     data = {},
//     responseType = "json",
//     callback = () => {},
//   } = options;



//   const xhr = new XMLHttpRequest();
//   let requestUrl = url;

//   // Для GET-запроса добавляем параметры в URL
//   if (method === "GET" && Object.keys(data).length > 0) {
//     const params = Object.entries(data)
//       .map(
//         ([key, value]) =>
//           `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
//       )
//       .join("&");
//     requestUrl += (requestUrl.includes("?") ? "&" : "?") + params;
//   }

//   xhr.open(method, requestUrl);
//   xhr.responseType = responseType;

//   xhr.onload = () => {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       callback(null, xhr.response);
//     } else {
//       callback(xhr.statusText || "Request failed", null);
//     }
//   };

//   xhr.onerror = () => {
//     callback("Network error", null);
//   };

//   if (method !== "GET" && Object.keys(data).length > 0) {
//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       formData.append(key, value);
//     });
//     xhr.send(formData);
//   } else {
//     xhr.send();
//   }
// };



const createRequest = (options = {}) => {
  const {
    url = "",
    method = "GET",
    data = {},
    responseType = "json",
    callback = () => {},
  } = options;

  const xhr = new XMLHttpRequest();
  let requestUrl = url;
  let sendData = null;

  // Для GET-запроса формируем строку параметров в URL
  if (method === "GET" && Object.keys(data).length > 0) {
    const params = Object.entries(data)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    requestUrl += (requestUrl.includes("?") ? "&" : "?") + params;
  } else if (method !== "GET" && Object.keys(data).length > 0) {
    // Для других методов формируем FormData
    sendData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      sendData.append(key, value);
    });
  }
  // Иначе sendData остаётся null (тело запроса отсутствует)

  xhr.open(method, requestUrl);
  xhr.responseType = responseType;

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      callback(xhr.statusText || "Request failed", null);
    }
  };

  xhr.onerror = () => {
    callback("Network error", null);
  };

  // Отправляем запрос с телом или без
  xhr.send(sendData);
};