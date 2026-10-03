class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector("#add-todo-popup");
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");

    this._handleEscapeClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };

    document.addEventListener("keydown", this._handleEscapeClose);
  }

  open() {
    this._popupElement.classList.add("popup_visible");
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
  }

  setEventListener() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
export default Popup;
