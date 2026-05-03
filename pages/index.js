import { v4 as uuidv4 } from "https://jspm.dev/uuid";
console.log(uuidv4());

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";

console.log(initialTodos);
console.log(validationConfig);

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const id = uuidv4();
  const values = { name, date, id };
  const todo = new Todo(values, "#todo-template");
  todosList.append(todo.getView());
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, "#todo-template");
  todosList.append(todo.getView());
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
  newTodoValidator.resetValidation();
});

//fix line 52
