import "../styles/index.css";
import {
  cardsContainer,
  cardTemplate,
  newCardPopup,
  cardFormElement,
  placeNameInput,
  placeURLInput,
  profilePopup,
  profileFormElement,
  profileName,
  profileAbout,
  aboutInput,
  nameInput,
  profileEditBtn,
  profileAddBtn,
  closeButtons,
  newCardSubmitBtn,
  profileSubmitBtn,
  avatarSubmitBtn,
  profileAvatar,
  newAvatarPopup,
  newAvatarFormElement,
  newAvatarURLInput,
} from "./variables.js";
import { buttonLoading } from "./utils";
// import { createCard, updateLike, removeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, disableButton } from "./validate.js";
import { selectors } from "./data.js";
// import * as api from "./api.js";

// OOP
import Api from "./ApiOOP.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Card from "./CardOOP.js";
import Section from "./Section.js";

// Cards
function cardLikeHandler(cardLikeBtn, likeCount, id) {
  let method = "";
  cardLikeBtn.classList.contains("card__like-button_active")
    ? (method = "DELETE")
    : (method = "PUT");

  api
    .toggleLike(id, method)
    .then((data) => {
      updateLike(cardLikeBtn, likeCount, data.likes.length);
    })
    .catch((error) => {
      console.error(error);
    });
}

// CARD

function cardDeleteHandler(card, id) {
  api
    .deleteCard(id)
    .then(() => {
      removeCard(card);
    })
    .catch((error) => {
      console.error(error);
    });
}

const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  ".card-container"
);

function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.generate();
}

// Forms
function profileFormSubmitHandler(data) {
  editProfilePopup.renderLoading(true);
  api
    .updateUserData(data.name, data.about)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close(profilePopup);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() =>
      setTimeout(() => editProfilePopup.renderLoading(false), 1000)
    );
}

function newCardFormSubmitHandler(data) {
  addCardPopup.renderLoading(true);
  api
    .postNewCard(data.placeName, data.placeURL)
    .then((cardData) => {
      cardList.addItem(createCard(cardData));
      addCardPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setTimeout(() => addCardPopup.renderLoading(false), 1000);
    });
}

function newAvatarFormSubmitHandler(data) {
  avatarPopup.renderLoading(true);
  api
    .updateUserAvatar(data.avatarURL)
    .then((avatarData) => {
      userInfo.setUserInfo(avatarData);
      avatarPopup.close(newAvatarPopup);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => setTimeout(() => avatarPopup.renderLoading(false), 1000));
}

// Adding event listeners

// New Card Popup
const addCardPopup = new PopupWithForm(newCardPopup, newCardFormSubmitHandler);
addCardPopup.setEventListeners();
profileAddBtn.addEventListener("click", () => {
  addCardPopup.open();
});

// Profile Edit Popup
const editProfilePopup = new PopupWithForm(
  profilePopup,
  profileFormSubmitHandler
);
editProfilePopup.setEventListeners();
profileEditBtn.addEventListener("click", () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});

// Popup Avatar change
const avatarPopup = new PopupWithForm(
  newAvatarPopup,
  newAvatarFormSubmitHandler
);
avatarPopup.setEventListeners();
profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
});

// Enabling validation
enableValidation(selectors);

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-18",
  headers: {
    authorization: "df69811e-988c-4da6-ab8f-d6576e714ab3",
    "Content-Type": "application/json",
  },
});

// Promise.all([api.getUser(), api.getInitialCards()])
//   .then(([user, cards]) => {
//     api.setUserId(user._id);
//     profileName.textContent = user.name;
//     profileAbout.textContent = user.about;
//     changeAvatar(user.avatar);

//     renderInitialCards(cards, cardsContainer, cardTemplate);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//TEST

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar",
});

// api.getInitialCards();
api.getUser().then((user) => {
  userInfo.setUserInfo(user);
});

api.getInitialCards().then((items) => {
  // console.log(items);
  cardList.renderItems(items.reverse());
});

// TODO 1. Card - добавить интерактивность  2. FormValidation
