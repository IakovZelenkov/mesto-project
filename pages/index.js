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

// Variables
const cardsContainer = document.querySelector(".card-container");
const cardTemplate = document.querySelector("#card-template").content;
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_profile");
const profileCloseBtn = profilePopup.querySelector(".popup__close-button");
const profileAddBtn = profile.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_card");
const newCardCloseBtn = newCardPopup.querySelector(".popup__close-button");
const profileFormElement = profilePopup.querySelector(".form");
const nameInput = profilePopup.querySelector("#name");
const jobInput = profilePopup.querySelector("#occupation");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__occupation");
const cardFormElement = newCardPopup.querySelector(".form");
const placeNameInput = newCardPopup.querySelector("#placeName");
const placeURLInput = newCardPopup.querySelector("#placeURL");
const picturePopup = document.querySelector(".popup-picture");
const picturePopupImage = picturePopup.querySelector(".popup-picture__image");
const picturePopupTitle = picturePopup.querySelector(".popup-picture__title");
const pictureCloseBtn = picturePopup.querySelector(".popup__close-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
//

// Card
function addCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    createPicturePopup(item);
    openPopup(picturePopup);
  });
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });

  return cardElement;
}

initialCards.forEach(function (item) {
  addCard(createCard(item));
});
//

// Popups
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

profileEditBtn.addEventListener("click", () => {
  setFormValue();
  openPopup(profilePopup);
});

profileAddBtn.addEventListener("click", () => openPopup(newCardPopup));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function createPicturePopup(item) {
  picturePopupImage.src = item.link;
  picturePopupImage.alt = item.name;
  picturePopupTitle.textContent = item.name;
}
//

// Form handlers
function setFormValue() {
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", profileJob.textContent);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(
    createCard({ name: placeNameInput.value, link: placeURLInput.value })
  );
  closePopup(newCardPopup);
  evt.target.reset();
}

profileFormElement.addEventListener("submit", profileFormSubmitHandler);
cardFormElement.addEventListener("submit", newCardFormSubmitHandler);
//
