import {
  page,
  popupList,
  picturePopupImage,
  picturePopupTitle,
} from "./variables.js";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  page.addEventListener("keydown", keyHandler);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  page.removeEventListener("keydown", keyHandler);
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
  }
}

popupList.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

export { openPopup, createPicturePopup, closePopup };
