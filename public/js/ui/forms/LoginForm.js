
class LoginForm extends AsyncForm {
  
  onSubmit(data) {
    User.login(data, (error, response) => {
      if (!error && response && response.success) {
        this.element.reset();
        App.setState('user-logged');
        const modal = this.element.closest('.modal');
        if (modal) {
          const modalId = modal.getAttribute('data-modal-id');
          App.getModal(modalId).close();
        }
      }
    });
  }
}