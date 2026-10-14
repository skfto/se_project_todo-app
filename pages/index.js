import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);

  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (item) => {
  const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const todoData = {
      id: uuidv4(),
      name: values.name,
      date: values.date,
      completed: false,
    };

    renderTodo(todoData);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListener();

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

function renderTodo(item) {
  const todo = generateTodo(item);
  section.addItem(todo);
}

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
