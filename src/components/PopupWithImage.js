import Popup from "./PopupOOP.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._img = this._popup.querySelector(".popup-picture__image");
    this._heading = this._popup.querySelector(".popup-picture__title");
  }

  open({ img, heading }) {
    super(open);
    this._img.src = img;
    this._img.alt = heading;
    this._heading.textContent = heading;
  }
}
