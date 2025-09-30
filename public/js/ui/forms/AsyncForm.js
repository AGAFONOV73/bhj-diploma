/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */

class AsyncForm {
  
  constructor(element) {
    if (!element) throw new Error("Element not provided");
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);

    return Object.fromEntries(formData.entries());
  }
  

  onSubmit(options) {}

  submit() {
    this.onSubmit(this.getData());
  }
}
