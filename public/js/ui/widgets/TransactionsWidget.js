/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не определён");
    }
    this.element = element;
    this.registerEvents();

    // Инициализация форм
    this.incomeForm = new CreateTransactionForm("#new-income-form");
    this.expenseForm = new CreateTransactionForm("#new-expense-form");

    // Передача обновления списка счетов при необходимости
    this.expenseForm.renderAccountsList();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element
      .querySelector(".create-income-button")
      .addEventListener("click", () => {
        const modal = App.getModal("newIncome"); 
        modal.open();
      });

    // Обработчик для кнопки "Расход"
    this.element
      .querySelector(".create-expense-button")
      .addEventListener("click", () => {
        const modal = App.getModal("newExpense");
        modal.open();
      });
  }
}

// class CreateTransactionForm extends AsyncForm {
//   constructor(elementSelector) {
//     super({form: document.querySelector(elementSelector)}); // вызов конструктора базового класса
//     this.renderAccountsList();
//     this.registerFormSubmit();
//   }

//   // Метод для загрузки счетов в список
//   renderAccountsList() {
//     Account.list(User.current.id, (err, response) => {
//       const select = this.element.querySelector('select[name="account_id"]');
//       if (err || !response || !response.data) return;
      
//       select.innerHTML = ''; // очищаем список
//       response.data.forEach(account => {
//         const option = document.createElement('option');
//         option.value = account.id;
//         option.textContent = account.name;
//         select.appendChild(option);
//       });
//     });
//   }

//   // Переопределённый метод onSubmit — вызывается при отправке формы
//   async onSubmit(data) {
//     try {
//       await Transaction.create(data);
//       this.element.reset(); // сброс формы
//       // закрываем окно
//       const modalId = this.element.closest('.modal').dataset.modalId; // например, 'newExpense' или 'newIncome'
//       const modal = App.getModal(`modal-${modalId}`);
//       modal.close();

//       // Обновляем приложение, чтобы обновилась статистика и список счетов
//       App.update();

//     } catch (err) {
//       // Обработка ошибок, например, отображение сообщения
//       console.error(err);
//     }
//   }
// }