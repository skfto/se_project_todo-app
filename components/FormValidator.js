import {
  toggleButtonState,
  hideInputError,
  showInputError,
} from "../scripts/validate.js";

class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      hideInputError(this._formEl, inputElement, this._settings);
    });

    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector,
    );

    hideInputError(this._inputList, buttonElement, this._settings);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(
        this._formEl,
        inputElement,
        inputElement.validationMessage,
        this._settings,
      );
    } else {
      hideInputError(this._formEl, inputElement, this._settings);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector),
    );
    const buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector,
    );

    toggleButtonState(this._inputList, buttonElement, this._settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        toggleButtonState(this._inputList, buttonElement, this._settings);
      });
    });
  }
}
export default FormValidator;

//fix line 45 line 59
