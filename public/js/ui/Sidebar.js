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
  // static initToggleButton() {
  //   const toggleButton = document.querySelector('.sidebar-toggle');
  //   if (toggleButton) {
  //     toggleButton.addEventListener('click', (e) => {
  //       e.preventDefault();
  //       const body = document.body;
  //       if (body.classList.contains('sidebar-open')) {
  //         body.classList.remove('sidebar-open');
  //         body.classList.add('sidebar-collapse');
  //       } else {
  //         body.classList.remove('sidebar-collapse');
  //         body.classList.add('sidebar-open');
  //       }
  //     });
  //   }
  // }

  // static initAuthLinks() {
  //   const sidebar = document.querySelector(".sidebar");
  //   if (sidebar) {
  //     sidebar.addEventListener("click", (e) => {
  //       if (e.target.closest(".menu-item_login")) {
  //         e.preventDefault();
  //         App.getModal("login").open();
  //       }
  //       if (e.target.closest(".menu-item_register")) {
  //         e.preventDefault();
  //         App.getModal("register").open();
  //       }
  //       if (e.target.closest(".menu-item_logout")) {
  //         e.preventDefault();
  //         User.logout((error, response) => {
  //           if (!error && response && response.success) {
  //             App.setState("init");
  //           }
  //         });
  //       }
  //     });
  //   }
  // }
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
