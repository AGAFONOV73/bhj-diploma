// далее можно использовать Entity
/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = "";
  
  // static list(data, callback) {
  //   createRequest({
  //     url: this.URL,
  //     method: "GET",
  //     data,
  //     responseType: "json",
  //     callback: (error, response) => {
  //       callback(error, response);
  //     },
  //   });
  // }
  
  // static create(data, callback) {
  //   createRequest({
  //     url: this.URL,
  //     method: "PUT",
  //     data,
  //     responseType: "json",
  //     callback: (error, response) => {
  //       callback(error, response);
  //     },
  //   });
  // }

  
  // static remove(data, callback ) {
  //   createRequest({
  //     url: this.URL,
  //     method: 'DELETE',
  //     data,
  //     responseType: 'json',
  //     callback: (error, response) => {
  //       callback(error, response);
  //     },
  //   });
  // }
  static list(data, callback) {
    createRequest({
      url: this.URL,
      method: "GET",
      data,
      responseType: "json",
      callback,
    
    });
  }
  
  static create(data, callback) {
    createRequest({
      url: this.URL,
      method: "PUT",
      data,
      responseType: "json",
      callback,
    });
  }

  
  static remove(data, callback ) {
    createRequest({
      url: this.URL,
      method: 'DELETE',
      data,
      responseType: 'json',
      callback,
    });
  }
}
