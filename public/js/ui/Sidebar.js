/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static initAuthLinks() {
    document
      .querySelectorAll('.sidebar__menu a[href="#register"]')
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const modal = App.getModal("modal-register");
          Modal.open(modal.element);
        });
      });

    document
      .querySelectorAll('.sidebar__menu a[href="#login"]')
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const modal = App.getModal("modal-login");
          Modal.open(modal.element);
        });
      });

    document
      .querySelectorAll('.sidebar__menu a[href="#logout"]')
      .forEach((link) => {
        link.addEventListener("click", async (e) => {
          e.preventDefault();
          const response = await User.logout();
          if (response.success) {
            App.setState("init");
          }
        });
      });
  }

  static initToggleButton() {
    const toggleBtn = document.querySelector("");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("sidebar-open");
        document.body.classList.toggle("sidebar-collapse");
      });
    }
  }
}
