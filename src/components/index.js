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
import { createCard, updateLike, removeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, disableButton } from "./validate.js";
import { selectors } from "./data.js";
// import * as api from "./api.js";


import Api from "./ApiOOP.js";
import PopupWithForm from "./PopupWithForm.js";

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
function setProfileValue() {
  nameInput.setAttribute("value", profileName.textContent);
  aboutInput.setAttribute("value", profileAbout.textContent);
  disableButton(profileSubmitBtn, selectors);
}

function changeAvatar(avatarURL) {
  profileAvatar.src = avatarURL;
}

function profileFormSubmitHandler(data) {
  // evt.preventDefault();
  // buttonLoading(profileSubmitBtn);
  // api
  //   .updateUserData(nameInput.value, aboutInput.value)
  //   .then((userData) => {
  //     profileName.textContent = userData.name;
  //     profileAbout.textContent = userData.about;
  //     closePopup(profilePopup);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  //   .finally(() => {
  //     buttonLoading(profileSubmitBtn, "Сохранить");
  //   });
  // console.log(data)
  api.updateUserData(data.name, data.about).then((userData) => {
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    editProfilePopup.close(profilePopup);
  })
  
  
  // Add button loading and error catch
  
  
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
  console.log(data)
}

function newAvatarFormSubmitHandler(data) {
  // buttonLoading(avatarSubmitBtn);
  console.log(data);
   api
    .updateUserAvatar(data.avatarURL).then((avatarData) => {
      changeAvatar(avatarData.avatar);
      avatarPopup.close(newAvatarPopup);
    })
  
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
      "Content-Type": "application/json"
    },
})

// Promise.all([api.getUser(), api.getInitialCards()])
//   .then(([user, cards]) => {
//     // api.setUserId(user._id);
//     profileName.textContent = user.name;
//     profileAbout.textContent = user.about;
//     changeAvatar(user.avatar);

//     renderInitialCards(cards, cardsContainer, cardTemplate);
//   })
//   .catch((error) => {
//     console.error(error);
//   });





//TEST

// api.getInitialCards();
api.getUser().then((user) => {
  profileName.textContent = user.name;
  profileAbout.textContent = user.about;
  changeAvatar(user.avatar);
});


// TODO 1. CardJS 2. FormValidatorJS 3.SectionJS 4. UserInfo