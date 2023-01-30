import "../styles/index.css";
import {
  newCardPopup,
  profilePopup,
  profileEditBtn,
  profileAddBtn,
  profileAvatar,
  newAvatarPopup,
  picturePopup,
} from "./variables.js";
import { enableValidation, disableButton } from "./validate.js";
import { selectors } from "./data.js";

// OOP
import Api from "./ApiOOP.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage";
import UserInfo from "./UserInfo.js";
import Card from "./CardOOP.js";
import Section from "./Section.js";

let userId;

// CARD
function cardDeleteHandler(id) {
  api
    .deleteCard(id)
    .then(() => {
      this.delete();
    })
    .catch((error) => {
      console.error(error);
    });
}

function cardLikeHandler(cardLikeBtn, id) {
  let method = "";
  cardLikeBtn.classList.contains("card__like-button_active")
    ? (method = "DELETE")
    : (method = "PUT");

  api
    .toggleLike(id, method)
    .then((data) => {
      this.updateLike(data.likes.length);
    })
    .catch((error) => {
      console.error(error);
    });
}

const popupImage = new PopupWithImage(picturePopup);
popupImage.setEventListeners();

function cardImagePopupHandler(img, title) {
  popupImage.open(img, title);
}

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".card-container"
);

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    userId,
    cardImagePopupHandler,
    cardLikeHandler,
    cardDeleteHandler
  );

  return card.generate();
}

// Card Popup
const addCardPopup = new PopupWithForm(newCardPopup, newCardFormSubmitHandler);
addCardPopup.setEventListeners();
profileAddBtn.addEventListener("click", () => {
  addCardPopup.open();
});

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

// Forms

// Profile Edit
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

const editProfilePopup = new PopupWithForm(
  profilePopup,
  profileFormSubmitHandler
);

editProfilePopup.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});

// Avatar Edit
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

//TEST

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar",
});

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userId = user._id;
    cardList.renderItems(cards.reverse());
  })
  .catch((error) => {
    console.error(error);
  });

// TODO 1. FormValidation 2. структура файлов
