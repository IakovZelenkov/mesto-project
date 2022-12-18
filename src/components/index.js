import "../styles/index.css";

import { renderInitialCards, addCard, createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, toggleButtonState } from "./validate.js";
import { selectors } from "./data.js";

// Page
export const page = document.querySelector(".root");
// Cards
export const cardsContainer = document.querySelector(".card-container");
export const cardTemplate = document.querySelector("#card-template").content;
// Cards Popup
export const picturePopup = document.querySelector(".popup-picture");
export const picturePopupImage = picturePopup.querySelector(
  ".popup-picture__image"
);
export const picturePopupTitle = picturePopup.querySelector(
  ".popup-picture__title"
);
const newCardPopup = document.querySelector(".popup_card");
const cardFormElement = newCardPopup.querySelector(".form");
const placeNameInput = newCardPopup.querySelector("#placeName");
const placeURLInput = newCardPopup.querySelector("#placeURL");
// Profile Popup
const profile = document.querySelector(".profile");
const profilePopup = document.querySelector(".popup_profile");
const profileFormElement = profilePopup.querySelector(".form");
const profileName = profile.querySelector(".profile__name");
const profileAbout = profile.querySelector(".profile__about");
const aboutInput = profilePopup.querySelector("#about");
const nameInput = profilePopup.querySelector("#name");
// Btns
const profileEditBtn = profile.querySelector(".profile__edit-button");
const profileAddBtn = profile.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
const formSubmitBtn = document.querySelector(".form__save-button");

// Forms
function setProfileValue() {
  nameInput.setAttribute("value", profileName.textContent);
  aboutInput.setAttribute("value", profileAbout.textContent);
  toggleButtonState([nameInput, aboutInput], formSubmitBtn, selectors);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(profilePopup);
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(
    createCard(placeNameInput.value, placeURLInput.value, cardTemplate),
    cardsContainer
  );
  closePopup(newCardPopup);
  evt.target.reset();
}

// Render cards from inital set
renderInitialCards(cardsContainer, cardTemplate);

// Adding event listeners
profileAddBtn.addEventListener("click", () => {
  openPopup(newCardPopup);
  toggleButtonState([placeNameInput, placeURLInput], formSubmitBtn, selectors);
});
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
profileEditBtn.addEventListener("click", () => {
  setProfileValue();
  openPopup(profilePopup);
});
profileFormElement.addEventListener("submit", profileFormSubmitHandler);
cardFormElement.addEventListener("submit", newCardFormSubmitHandler);

enableValidation(selectors);
