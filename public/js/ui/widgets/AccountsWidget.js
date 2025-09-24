

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) throw new Error('Element not provided');
    this.element = element;
    this.registerEvents();
    this.update();
  }

  
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if (e.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      }
      if (e.target.closest('.account')) {
        this.onSelectAccount(e.target.closest('.account'));
      }
    });
  }

  
  update() {
    if (User.current()) {
      Account.list({}, (response) => {
        console.log('response:', response);
        if (response && response.success) {
          this.clear();
          this.renderItem(response.data);
        } else {
          console.error('Failed to load accounts:', response);
        }
      });
    }
  }
  


  
  clear() {
    this.element.querySelectorAll('.account').forEach(account => account.remove());
  }

  
  onSelectAccount( element ) {
    this.element.querySelectorAll('.account').forEach(account => account.classList.remove('active'));
    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });
  }

  
  getAccountHTML(item) {
    return `<li class="account" data-id="${item.id}">
      <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
      </a>
    </li>`;
  }

  
  renderItem(data) {
    data.forEach(item => {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
    });
  }
}