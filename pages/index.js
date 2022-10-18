// Card

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsContainer = document.querySelector(".card-container");

function addCard(cardName, cardURL) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardURL;
  cardElement.querySelector(".card__image").alt = cardName;
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      picturePopupToggle(cardName, cardURL);
    });
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      cardElement.remove();
    });

  cardsContainer.prepend(cardElement);
}

initialCards.forEach(function (card) {
  addCard(card.name, card.link);
});
//

// Popup
const profile = document.querySelector(".profile");

const profileEditBtn = profile.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_profile");
const profileCloseBtn = profilePopup.querySelector(".popup__close-button");

function profilePopupToggle() {
  formValue();
  profilePopup.classList.toggle("popup_opened");
}

profileEditBtn.addEventListener("click", profilePopupToggle);
profileCloseBtn.addEventListener("click", profilePopupToggle);

const profileAddBtn = profile.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_card");
const newCardCloseBtn = newCardPopup.querySelector(".popup__close-button");

function newCardPopupToggle() {
  newCardPopup.classList.toggle("popup_opened");
}

profileAddBtn.addEventListener("click", newCardPopupToggle);
newCardCloseBtn.addEventListener("click", newCardPopupToggle);
//
//

// Form handlers

const profileFormElement = profilePopup.querySelector(".form");
const nameInput = profilePopup.querySelector("#name");
const jobInput = profilePopup.querySelector("#occupation");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__occupation");

const cardFormElement = newCardPopup.querySelector(".form");
const placeNameInput = newCardPopup.querySelector("#placeName");
const placeURLInput = newCardPopup.querySelector("#placeURL");

function formValue() {
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", profileJob.textContent);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profilePopupToggle();
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(placeNameInput.value, placeURLInput.value);
  newCardPopupToggle();
}

profileFormElement.addEventListener("submit", profileFormSubmitHandler);
cardFormElement.addEventListener("submit", newCardFormSubmitHandler);
//

// Picture popup

const picturePopup = document.querySelector(".popup-picture");

function picturePopupToggle(name, url) {
  picturePopup.querySelector(".popup-picture__image").src = url;
  picturePopup.querySelector(".popup-picture__image").alt = name;
  picturePopup.querySelector(".popup-picture__title").textContent = name;
  picturePopup.classList.toggle("popup-picture_opened");
}

const pictureCloseBtn = picturePopup.querySelector(".popup__close-button");

pictureCloseBtn.addEventListener("click", function () {
  picturePopup.classList.toggle("popup-picture_opened");
});
