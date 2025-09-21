import User from "./User.js";
/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  async onSubmit(data) {
    try {
      // Регистрация пользователя (авторизация) через User.login
      await User.login(data); // Передача формы данных
      // После успешного входа - сброс формы
      this.element.reset();

      // Установка состояния приложения как "пользователь вошёл"
      App.setState("user-logged");

      // Закрытие модального окна, в котором находится форма
      // Предположим, что форма внутри модального окна, и Modal.close() работает с этим окном
      // Можно найти ближайшее родительское окно, если необходимо
      const modal = this.element.closest(".modal");
      if (modal) {
        Modal.close(modal);
      }
    } catch (error) {
      // Обработка ошибок, если нужно, например, показать сообщение
      console.error("Ошибка при входе:", error);
    }
  }
}
export { LoginForm };
