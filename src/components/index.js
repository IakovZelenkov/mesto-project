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

// CARD TEST
// const cardList = new Section({
//   data: items,
//   renderer: (item) => {
//     const card = createCard(item);
//     cardList.addItem(card);
// }})

function createCard(cardData){
  const card = new Card(cardData, '#card-template')
  return card.generate();
}

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

function addCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}

function renderInitialCards(cardsObject, cardsContainer, cardTemplate) {
  cardsObject.reverse().forEach((item) => {
    addCard(
      createCard(item, cardTemplate, cardLikeHandler, cardDeleteHandler),
      cardsContainer
    );
  });
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
  // buttonLoading(newCardSubmitBtn);
  // api
  //   .postNewCard(data)
  //   .then((cardData) => {
  //     addCard(
  //       createCard(cardData, cardTemplate, cardLikeHandler, cardDeleteHandler),
  //       cardsContainer
  //     );
  //     closePopup(newCardPopup);
  //     evt.target.reset();
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  //   .finally(() => {
  //     buttonLoading(newCardSubmitBtn, "Создать");
  //   });
  console.log(data);
}

function newAvatarFormSubmitHandler(data) {
  // buttonLoading(avatarSubmitBtn);
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

  // api
  //   .updateUserAvatar(data.avatarURL)
  //   .then((avatarData) => {
  //     changeAvatar(avatarData);
  //   })

  //   .catch((error) => {
  //     console.error(error);
  //   })
  // .finally(() => {
  //   buttonLoading(avatarSubmitBtn, "Сохранить");
  // });
}

// Adding event listeners

// profileAddBtn.addEventListener("click", () => {
//   openPopup(newCardPopup);
//   disableButton(profileSubmitBtn, selectors);
// });

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

// profileEditBtn.addEventListener("click", () => {
//   setProfileValue();
//   openPopup(profilePopup);
// });

// Popup Avatar change
const avatarPopup = new PopupWithForm(
  newAvatarPopup,
  newAvatarFormSubmitHandler
);
avatarPopup.setEventListeners();
profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
});

// profileAvatar.addEventListener("click", () => {
//   openPopup(newAvatarPopup);
// });

// profileFormElement.addEventListener("submit", profileFormSubmitHandler);

// cardFormElement.addEventListener("submit", (evt) => {
//   newCardFormSubmitHandler(evt);
//   disableButton(newCardSubmitBtn, selectors);
// });

// newAvatarFormElement.addEventListener("submit", newAvatarFormSubmitHandler);

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
  const cardList = new Section({
    items,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
      // console.log(item)
  }},
    '.card-container'
  )
  cardList.renderItems();
});

// TODO 1. Card - добавить интерактивность + добавление новых карточек, 2. FormValidation 

