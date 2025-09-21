/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";

  // Устанавливает текущего пользователя в localStorage
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Возвращает объект текущего пользователя или undefined, если нет
  static current() {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return undefined;
      }
    }
    return undefined;
  }

  // Удаляет текущего пользователя из localStorage
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  // Загружает данные о текущем пользователе с сервера и обновляет localStorage
  static fetch(callback) {
    createRequest({
      url: `${this.URL}/current`,
      method: "GET",
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

  // Регистрация нового пользователя
  static register(data, callback) {
    createRequest({
      url: `${this.URL}/register`,
      method: "POST",
      data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  // Авторизация пользователя
  static login(data, callback) {
    createRequest({
      url: `${this.URL}/login`,
      method: "POST",
      data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  // Выход из системы
  static logout(callback) {
    createRequest({
      url: `${this.URL}/logout`,
      method: "POST",
      callback: (err, response) => {
        if (!err && response && response.success) {
          this.unsetCurrent();
        }
        if (callback) {
          callback(err, response);
        }
      },
    });
  }
}
