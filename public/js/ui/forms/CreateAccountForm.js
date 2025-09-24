

class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (error, response) => {
      if (error) {
        // Ошибка сети или сервера
        alert("Ошибка сети. Попробуйте позже.");
        console.error("Network error:", error);
        return;
      }

      if (response && response.success) {
        this.element.reset();
        App.getModal("createAccount").close();
        App.update();
      } else if (response && response.error) {
        // Показываем сообщение ошибки от сервера
        alert(`Ошибка создания счёта: ${response.error}`);
        console.error("Account creation failed:", response.error);
      } else {
        alert("Неизвестная ошибка при создании счёта");
        console.error("Account creation failed: Unknown error", response);
      }
    });
  }
}
