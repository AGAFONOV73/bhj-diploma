/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */

class Account extends Entity {
  static URL = "/account";

  static get(id = "", callback) {
    createRequest({
      url: this.URL + (id ? `/${id}` : ""),
      method: "GET",
      responseType: "json",
      callback: (error, response) => {
        callback(error, response);
      },
    });
  }

  /**
   * Получает список счетов
   * @param {Object} data - параметры запроса (можно пустой объект)
   * @param {Function} callback - функция обратного вызова с одним параметром response
   */
  static list(data = {}, callback) {
    createRequest({
      url: this.URL,
      method: "GET",
      data: data,
      responseType: "json",
      callback: (error, response) => {
        if (error) {
          // Формируем ответ с ошибкой
          callback({ success: false, error: error });
        } else {
          // Предполагается, что сервер возвращает объект вида {success: true, data: [...]}
          callback(response);
        }
      },
    });
  }
}