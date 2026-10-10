class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  //Call the method to update the text content
  _updateText() {
    // Set the text content of corresponding text element.
    // Call this in the constructor and whenever the count gets updated
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
export default TodoCounter;
