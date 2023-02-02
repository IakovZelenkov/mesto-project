import "./index.css";
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
  config,
} from "../utils/variables.js";
import Api from "../components/Api.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";

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
  handleProfileFormSubmi
);

editProfilePopup.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();

  formValidators[profileFormElement.getAttribute("name")].resetValidation();
});

function handleProfileFormSubmi(data) {
  editProfilePopup.renderLoading(true);
  api
    .updateUserData(data.name, data.about)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
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
  handleNewAvatarFormSubmit
);

profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
  formValidators[newAvatarFormElement.getAttribute("name")].resetValidation();
});

avatarPopup.setEventListeners();

function handleNewAvatarFormSubmit(data) {
  avatarPopup.renderLoading(true);
  api
    .updateUserAvatar(data.avatarURL)
    .then((avatarData) => {
      userInfo.setUserInfo(avatarData);
      avatarPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => setTimeout(() => avatarPopup.renderLoading(false), 1000));
}

// Add new Card

const addCardPopup = new PopupWithForm(newCardPopup, handleNewCardFormSubmit);

addCardPopup.setEventListeners();

cardAddBtn.addEventListener("click", () => {
  addCardPopup.open();
  formValidators[newCardFormElement.getAttribute("name")].resetValidation();
});

function handleNewCardFormSubmit(data) {
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
function handleCardDelete(card, id) {
  api
    .deleteCard(id)
    .then(() => {
      card.delete();
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleCardLike(card, cardLikeBtn, id) {
  let method = "";
  cardLikeBtn.classList.contains("card__like-button_active")
    ? (method = "DELETE")
    : (method = "PUT");

  api
    .toggleLike(id, method)
    .then((data) => {
      card.updateLike(data.likes.length);
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
    handleCardClick,
    handleCardLike,
    handleCardDelete
  );

  return card.generate();
}

// Image popup
const popupImage = new PopupWithImage(picturePopup);

popupImage.setEventListeners();

function handleCardClick(img, title) {
  popupImage.open(img, title);
}

// User
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar",
});

// Form Validation

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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
