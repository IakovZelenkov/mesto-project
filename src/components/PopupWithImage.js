import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._img = this._popup.querySelector(".popup-picture__image");
    this._title = this._popup.querySelector(".popup-picture__title");
  }

  open(img, title) {
    super.open();
    this._img.src = img;
    this._img.alt = title;
    this._title.textContent = title;
  }
}
