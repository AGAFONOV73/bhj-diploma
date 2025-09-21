import { App } from "./App.js";

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  async onSubmit(data) {
    try {
      // Регистрация пользователя через User.register
      await User.register(data);

      // После успешной регистрации - сбрасываем форму
      this.element.reset();

      // Устанавливаем состояние приложения как "пользователь вошёл"
      App.setState("user-logged");

      // Находим окно (модальное) и закрываем его
      const modalElement = this.element.closest(".modal");
      if (modalElement) {
        Modal.close(modalElement);
      }
    } catch (error) {
      // Обработка ошибок (если необходимо)
      console.error("Ошибка при регистрации:", error);
    }
  }
}

// Добавляем обработчик клика для открытия модального окна регистрации
// document.addEventListener('DOMContentLoaded', () => {
//   const registerLink = document.querySelector('.menu-item_register a');
//   if (registerLink) {
//     registerLink.addEventListener('click', (event) => {
//       event.preventDefault(); // предотвращаем переход по ссылке

//       const modal = App.getModal('register');
//       if (modal) {
//         modal.open();
//       } else {
//         console.warn('Модальное окно регистрации не найдено');
//       }
//     });
//   } else {
//     console.warn('Ссылка регистрации (.menu-item_register a) не найдена');
//   }
// });

// export { RegisterForm };
