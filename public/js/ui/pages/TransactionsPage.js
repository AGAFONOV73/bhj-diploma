class TransactionsPage {
  constructor(element) {
    if (!element) throw new Error("Element not provided");
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  registerEvents() {
    this.element.addEventListener("click", (e) => {
      if (e.target.closest(".remove-account")) {
        this.removeAccount();
      }
      if (e.target.closest(".transaction__remove")) {
        const id = e.target.closest(".transaction__remove").dataset.id;
        this.removeTransaction(id);
      }
    });
  }

  removeAccount() {
    if (!this.lastOptions) return;
    if (confirm("Вы действительно хотите удалить счёт?")) {
      Account.remove({ id: this.lastOptions.account_id }, (error, response) => {
        if (response && response.success) {
          this.clear();
          App.updateWidgets();
          App.updateForms();
        }
      });
    }
  }

  removeTransaction(id) {
    if (confirm("Вы действительно хотите удалить транзакцию?")) {
      Transaction.remove({ id }, (error, response) => {
        if (response && response.success) {
          this.update();
          App.updateWidgets();
        }
      });
    }
  }

  render(options) {
    if (!options) return;
    this.lastOptions = options;
    Account.get(options.account_id, (error, response) => {
      if (response && response.success) {
        this.renderTitle(response.data.name);
      }
    });
    // Transaction.list(options, (response) => {
    //   if (response && response.success) {
         
    //     this.renderTransactions(response.data);
    //   }
    // });
    Transaction.list(options, (error, response) => {
      if (error) {
        console.error(error);
        return;
      }
      if (response && response.success) {
        this.renderTransactions(response.data);
      }
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  renderTitle(name) {
    const title = this.element.querySelector(".content-title");
    if (title) {
      title.textContent = name;
    }
  }

  formatDate(date) {
    const d = new Date(date);
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year} г. в ${hours}:${minutes}`;
  }

  getTransactionHTML(item) {
    return `
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(
              item.created_at
            )}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${
            item.id
          }">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  renderTransactions(data) {
    const content = this.element.querySelector(".content");
    if (content) {
      if (Array.isArray(data)) {
        const html = data.reduce(
          (acc, item) => acc + this.getTransactionHTML(item),
          ""
        );
        content.innerHTML = html;
      } else {
        content.innerHTML = "";
      }
    }
  }
}
