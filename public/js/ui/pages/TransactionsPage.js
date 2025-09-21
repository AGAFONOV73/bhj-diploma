/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
export class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не передан");
    }
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }

  registerEvents() {
    // Удаление счёта
    this.element
      .querySelector(".remove-account")
      .addEventListener("click", () => {
        this.removeAccount();
      });

    // Делегирование событий для удаления транзакций
    this.element
      .querySelector(".content")
      .addEventListener("click", (event) => {
        if (event.target.closest(".transaction__remove")) {
          const transactionId = event.target.closest(".transaction__remove")
            .dataset.id;
          this.removeTransaction(transactionId);
        }
      });
  }

  async removeAccount() {
    if (!this.lastOptions || !this.lastOptions.account_id) {
      return;
    }

    if (confirm("Вы действительно хотите удалить счёт?")) {
      try {
        await Account.remove(this.lastOptions.account_id);
        // Обновление страницы и виджетов
        App.updateWidgets();
        App.updateForms();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async removeTransaction(transactionId) {
    if (!transactionId) return;

    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      try {
        await Transaction.remove(transactionId);
        App.update();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async render(options) {
    if (!options || !options.account_id) {
      return;
    }

    this.lastOptions = options;

    // Получение данных счета
    const accountData = await Account.get(this.lastOptions.account_id);
    if (accountData && accountData.name) {
      this.renderTitle(accountData.name);
    }

    // Получение транзакций
    const transactionsResponse = await Transaction.list(this.lastOptions);
    if (transactionsResponse && transactionsResponse.data) {
      this.renderTransactions(transactionsResponse.data);
    } else {
      this.renderTransactions([]);
    }
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle(""); // сброс заголовка
    this.lastOptions = null;
  }

  renderTitle(name) {
    this.element.querySelector(".content-title").textContent = name;
  }

  formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const datePart = date
      .toLocaleDateString("ru-RU", options)
      .replace("г.", "г.");
    const timePart = date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart} в ${timePart}`;
  }

  getTransactionHTML(item) {
    const dateFormatted = this.formatDate(item.created_at);
    const typeClass =
      item.type.toLowerCase() === "income"
        ? "transaction_income"
        : "transaction_expense";

    return `
<div class="transaction ${typeClass} row">
  <div class="col-md-7 transaction__details">
    <div class="transaction__icon">
      <span class="fa fa-money fa-2x"></span>
    </div>
    <div class="transaction__info">
      <h4 class="transaction__title">${item.name}</h4>
      <div class="transaction__date">${dateFormatted}</div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="transaction__summ">
      ${item.sum} <span class="currency">₽</span>
    </div>
  </div>
  <div class="col-md-2 transaction__controls">
    <button class="btn btn-danger transaction__remove" data-id="${item.id}">
      <i class="fa fa-trash"></i>
    </button>
  </div>
</div>
`;
  }

  renderTransactions(data) {
    const container = this.element.querySelector(".content");
    container.innerHTML = "";

    data.forEach((item) => {
      container.innerHTML += this.getTransactionHTML(item);
    });
  }
}

