class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    const select = this.element.querySelector('select[name="account_id"]');
    if (!select) return;

    Account.list({}, (response) => {
      if (response && response.success) {
        // Формируем всю разметку одним вызовом reduce
        const optionsHTML = response.data.reduce((html, account) => {
          return (
            html + `<option value="${account.id}">${account.name}</option>`
          );
        }, "");

        // Присваиваем только один раз
        select.innerHTML = optionsHTML;
      } else {
        console.error("Failed to load accounts for select:", response);
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (!error && response && response.success) {
        App.update();
        this.element.reset();
        const modal = this.element.closest(".modal");
        if (modal) {
          const modalId = modal.getAttribute("data-modal-id");
          App.getModal(modalId).close();
        }
      }
    });
  }
}
