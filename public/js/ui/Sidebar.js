class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const toggleButton = document.querySelector(".sidebar-toggle");
    if (toggleButton) {
      toggleButton.addEventListener("click", (e) => {
        e.preventDefault();
        const body = document.body;
        body.classList.toggle("sidebar-open");
        body.classList.toggle("sidebar-collapse");
      });
    }
  }

  static initAuthLinks() {
    const loginBtn = document.querySelector(".menu-item_login");
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        App.getModal("login").open();
      });
    }

    const registerBtn = document.querySelector(".menu-item_register");
    if (registerBtn) {
      registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        App.getModal("register").open();
      });
    }

    const logoutBtn = document.querySelector(".menu-item_logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        User.logout((error, response) => {
          if (!error && response && response.success) {
            App.setState("init");
          }
        });
      });
    }
  }
}
