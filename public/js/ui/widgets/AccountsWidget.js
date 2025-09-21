/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

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
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не определён');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  // Устанавка обработчиков событий: создание счета и выбор счета
  registerEvents() {
    // Обработчик для кнопки "Новый счёт"
    this.element.querySelector('.create-account').addEventListener('click', () => {
      const modal = App.getModal('newAccount'); // получаем модальное окно
      modal.open(); // открываем его
    });

    // Делегирование события клика по счетам
    this.element.addEventListener('click', (e) => {
      const accountItem = e.target.closest('.account');
      if (accountItem) {
        this.onSelectAccount(accountItem);
      }
    });
  }

  // Обновляет список счетов
  update() {
    if (!User.current) return; // если пользователь не авторизован, ничего не делаем

    // Получение списка счетов
    Account.list(User.current.id, (err, response) => {
      if (err || !response || !response.data) return;
      this.clear();

      response.data.forEach(account => this.renderItem(account));
    });
  }

  // Очищает список счетов
  clear() {
    this.element.querySelectorAll('.account').forEach(item => item.remove());
  }

  // Обрабатывает выбор счета
  onSelectAccount(accountElement) {
    // Убрать активный класс у всех
    this.element.querySelectorAll('.account').forEach(item => item.classList.remove('active'));

    // Добавить активный класс выбранному
    accountElement.classList.add('active');

    // Получить id выбранного счета
    const accountId = accountElement.dataset.id;

    // Передать в App вызов отображения страницы транзакций
    App.showPage('transactions', { account_id: accountId });
  }

  // Формирует HTML для счета
  getAccountHTML(data) {
    const sumFormatted = data.sum.toLocaleString(undefined, {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    });
    return `
<li class="account" data-id="${data.id}">
    <a href="#">
        <span>${data.name}</span> /
        <span>${sumFormatted}</span>
    </a>
</li>`;
  }

  // Отрисовка счета
  renderItem(data) {
    const html = this.getAccountHTML(data);
    this.element.insertAdjacentHTML('beforeend', html);
  }
}