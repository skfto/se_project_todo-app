import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    renderTodo(values);
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListener();

const generateTodo = (item) => {
  const todo = new Todo(item, "#todo-template");
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const date = evt.target.date.value;

//   const id = uuidv4();
//   const values = { name, date, id };

//   renderTodo(values);
//   closeModal(addTodoPopup);
//   newTodoValidator.resetValidation();
// });

// initialTodos.forEach((item) => {
//   const todo = new Todo(item, "#todo-template");
//   todosList.append(todo.getView());
// });

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// }); connected to line 75

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo); // original code ***todosList.append(todo);
};

// moved to line 25
// const generateTodo = (item) => {
//   const todo = new Todo(item, "#todo-template");
//   return todo.getView();
// };

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

// addTodoButton.addEventListener("click", () => {
//   openModal(addTodoPopupEl);
//   newTodoValidator.resetValidation();
// });
