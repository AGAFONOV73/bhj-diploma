


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
        select.innerHTML = '';
        response.data.forEach(account => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = account.name;
          select.appendChild(option);
        });
      } else {
        console.error('Failed to load accounts for select:', response);
      }
    });
  }

  
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (!error && response && response.success) {
        App.update();
        this.element.reset();
        const modal = this.element.closest('.modal');
        if (modal) {
          const modalId = modal.getAttribute('data-modal-id');
          App.getModal(modalId).close();
        }
      }
    });
  }
}