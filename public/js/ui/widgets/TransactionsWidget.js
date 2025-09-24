


class TransactionsWidget {
  
  constructor( element ) {
    if (!element) {
      throw new Error("Элемент не существует");
    }
    this.element = element;
    this.registerEvents()
  }
 
  registerEvents() {
    this.element.querySelector(".create-income-button").onclick = () => {
      App.modals.newIncome.open();
    }
    this.element.querySelector(".create-expense-button").onclick = () => {
      App.modals.newExpense.open();
    }
  }
}