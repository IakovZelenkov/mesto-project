import "../styles/index.css";

import { renderInitialCards } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import {
  profileFormSubmitHandler,
  newCardFormSubmitHandler,
  setFormValue,
} from "./validate.js";

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
// Add Card Popup
export const newCardPopup = document.querySelector(".popup_card");
export const cardFormElement = newCardPopup.querySelector(".form");
export const placeNameInput = newCardPopup.querySelector("#placeName");
export const placeURLInput = newCardPopup.querySelector("#placeURL");
// Profile Popup
const profile = document.querySelector(".profile");
export const profilePopup = document.querySelector(".popup_profile");
export const profileFormElement = profilePopup.querySelector(".form");
export const profileName = profile.querySelector(".profile__name");
export const profileJob = profile.querySelector(".profile__occupation");
export const jobInput = profilePopup.querySelector("#occupation");
export const nameInput = profilePopup.querySelector("#name");

const profileEditBtn = profile.querySelector(".profile__edit-button");
const profileAddBtn = profile.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");

renderInitialCards(cardsContainer, cardTemplate);

profileAddBtn.addEventListener("click", () => openPopup(newCardPopup));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

profileEditBtn.addEventListener("click", () => {
  setFormValue();
  openPopup(profilePopup);
});

profileFormElement.addEventListener("submit", profileFormSubmitHandler);
cardFormElement.addEventListener("submit", newCardFormSubmitHandler);
