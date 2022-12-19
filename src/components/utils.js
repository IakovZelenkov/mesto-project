// Page
export const page = document.querySelector(".root");
export const popupList = document.querySelectorAll(".popup");
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
export const newCardPopup = document.querySelector(".popup_card");
export const cardFormElement = newCardPopup.querySelector(".form");
export const placeNameInput = newCardPopup.querySelector("#placeName");
export const placeURLInput = newCardPopup.querySelector("#placeURL");
export const newCardSumbitBtn =
  newCardPopup.querySelector(".form__save-button");
// Profile Popup
export const profile = document.querySelector(".profile");
export const profilePopup = document.querySelector(".popup_profile");
export const profileFormElement = profilePopup.querySelector(".form");
export const profileName = profile.querySelector(".profile__name");
export const profileAbout = profile.querySelector(".profile__about");
export const aboutInput = profilePopup.querySelector("#about");
export const nameInput = profilePopup.querySelector("#name");
// Btns
export const profileEditBtn = profile.querySelector(".profile__edit-button");
export const profileAddBtn = profile.querySelector(".profile__add-button");
export const closeButtons = document.querySelectorAll(".popup__close-button");
export const formSubmitBtn = document.querySelector(".form__save-button");
