import { AsyncForm } from './path/to/AsyncForm.js';
// const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list({}, (err, response) => {
      if (err || !response || !response.success) {
        console.error("Ошибка загрузки списка счетов:", err || response.error);
        return;
      }

      const accounts = response.data;
      const select = this.element.querySelector('select[name="account_id"]');

      if (!select) {
        console.error("В форме не найден селект для списка счетов");
        return;
      }
      select.innerHTML = "";

      if (!accounts.length) {
        const option = document.createElement("option");
        option.textContent = "Счета отсутствуют";
        option.disabled = true;
        select.appendChild(option);
        return;
      }

      accounts.forEach((account) => {
        const option = document.createElement("option");
        option.value = account.id;
        option.textContent = account.name;
        select.appendChild(option);
      });
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    if (!data || typeof data !== "object") {
      console.error("Некорректные данные формы");
      return;
    }

    Transaction.create(data, (err, response) => {
      if (err) {
        console.error("Ошибка при создании транзакции:", err);
        return;
      }

      if (response && response.success) {
        console.log("Транзакция успешно создана", response.data);
        App.update();

        this.element.reset();

        const modal = App.getModal("createTransaction");
        if (modal) {
          modal.close();
        } else {
          console.warn("Модальное окно createTransaction не найдено");
        }
      } else {
        console.error(
          "Ошибка создания транзакции:",
          (response && response.error) || "неизвестная ошибка"
        );
      }
    });
  }
}

export { CreateTransactionForm };