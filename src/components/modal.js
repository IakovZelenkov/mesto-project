import { setFormValue } from "./validate.js";
import {
  page,
  profilePopup,
  newCardPopup,
  picturePopup,
  picturePopupImage,
  picturePopupTitle,
} from "./index.js";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  page.addEventListener("keydown", keyHandler);
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function createPicturePopup(name, link) {
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  picturePopupTitle.textContent = name;
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = page.querySelector(".popup_opened");
    closePopup(openedPopup);
    page.removeEventListener("keydown", keyHandler);
  }
}

export { openPopup, createPicturePopup, closePopup };
