import "../styles/index.css";
import {
  newCardPopup,
  profilePopup,
  profileEditBtn,
  cardAddBtn,
  profileAvatar,
  newAvatarPopup,
  picturePopup,
  profileFormElement,
  newAvatarFormElement,
  newCardFormElement,
  selectors,
} from "./variables.js";
import Api from "./Api.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";

let userId = "";

// CARD
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".card-container"
);

// Profile Edit
const editProfilePopup = new PopupWithForm(
  profilePopup,
  profileFormSubmitHandler
);

const profileFormValidation = new FormValidator(selectors, profileFormElement);

editProfilePopup.setEventListeners();

profileFormValidation.enableValidation();

profileEditBtn.addEventListener("click", () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();

  profileFormValidation.disableButtonState();
});

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

// Avatar Edit
const avatarPopup = new PopupWithForm(
  newAvatarPopup,
  newAvatarFormSubmitHandler
);

const avatarFormValidation = new FormValidator(selectors, newAvatarFormElement);

avatarFormValidation.enableValidation();

profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidation.disableButtonState();
});

avatarPopup.setEventListeners();

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

// Add new Card

const addCardPopup = new PopupWithForm(newCardPopup, newCardFormSubmitHandler);
const newCardFormValidation = new FormValidator(selectors, newCardFormElement);

newCardFormValidation.enableValidation();

addCardPopup.setEventListeners();

cardAddBtn.addEventListener("click", () => {
  addCardPopup.open();

  newCardFormValidation.disableButtonState();
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
// Card
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

// Image popup
const popupImage = new PopupWithImage(picturePopup);

popupImage.setEventListeners();

function cardImagePopupHandler(img, title) {
  popupImage.open(img, title);
}

// User
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar",
});

//API

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-18",
  headers: {
    authorization: "df69811e-988c-4da6-ab8f-d6576e714ab3",
    "Content-Type": "application/json",
  },
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
