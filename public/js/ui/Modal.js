

class Modal {
  
  constructor(element){
    if (!element) throw new Error('Element not provided');
    this.element = element;
    this.registerEvents();
  }

  
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if (e.target.closest('[data-dismiss="modal"]')) {
        this.onClose(e);
      }
    });
  }

  
  onClose(e) {
    e.preventDefault();
    this.close();
  }
  
  open() {
    this.element.style.display = 'block';
  }
  
  close(){
    this.element.style.display = '';
  }
}