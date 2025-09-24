

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if(!element){
      throw new Error("Элемент не существует");
    }
    this.element = element;
    this.update();
  }

  
  update(){
    const user = User.current();
    if (user) {
    const el = this.element.querySelector('.user-name');
      if (el) el.textContent = user.name;
    }  
  }
}