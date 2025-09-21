import { AsyncForm } from './path/to/AsyncForm.js';
/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  constructor(element, modalWindow) {
    super(element);
    this.modalWindow = modalWindow; // DOM-элемент окна/модального окна
  }

  async onSubmit(data) {
    try {
      const result = await Account.create(data);
      if (result.success) {
        this.reset();
        if (this.modalWindow) {
          
          this.closeModal();
        }
        App.update();
      }
    } catch (error) {
      console.error('Ошибка при создании аккаунта:', error);
      
    }
  }

  closeModal() {
    
    if (this.modalWindow) {
      this.modalWindow.style.display = 'none'; 
    }
  }

  reset() {
    this.element.reset(); // сброс формы
  }
}