import { Entity } from './Entity.js';
/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = "/account";

  /**
   * Получает информацию о счёте
   * */
  static get(id, callback) {
    if (!id) {
      callback(new Error("Не указан id"), null);
      return;
    }

    createRequest({
      url: `${this.URL}/${id}`,
      method: "GET",
      callback,
    });
  }
}
