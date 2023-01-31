import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".form ");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__save-button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      return this._handleSubmit(this._getInputValues());
    });
  }
}
