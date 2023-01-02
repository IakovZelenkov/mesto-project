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
} from "./utils.js";
import { renderInitialCards, addCard, createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import {
  enableValidation,
  toggleButtonState,
  disableButton,
} from "./validate.js";
import { selectors } from "./data.js";
import * as api from "./api.js";

// Forms
function setProfileValue() {
  nameInput.setAttribute("value", profileName.textContent);
  aboutInput.setAttribute("value", profileAbout.textContent);
  toggleButtonState([nameInput, aboutInput], profileSubmitBtn, selectors);
}

function changeAvatar(avatarURL) {
  profileAvatar.src = avatarURL;
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileSubmitBtn.textContent = "Сохранение...";
  api
    .updateUserData(nameInput.value, aboutInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileAbout.textContent = userData.about;
      closePopup(profilePopup);
    })
    .finally(() => (profileSubmitBtn.textContent = "Сохранить"))
    .catch((error) => {
      console.log(error);
    });
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  newCardSubmitBtn.textContent = "Сохранение...";
  api
    .postNewCard(placeNameInput.value, placeURLInput.value)
    .then((cardData) => {
      addCard(createCard(cardData, cardTemplate), cardsContainer);
      closePopup(newCardPopup);
      evt.target.reset();
    })
    .finally(() => (newCardSubmitBtn.textContent = "Создать"))
    .catch((error) => {
      console.log(error);
    });
}

function newAvatarFormSubmitHandler(evt) {
  evt.preventDefault();
  avatarSubmitBtn.textContent = "Сохранение...";
  api
    .updateUserAvatar(newAvatarURLInput.value)
    .then((avatarData) => {
      changeAvatar(avatarData.avatar);
      closePopup(newAvatarPopup);
      evt.target.reset();
    })
    .finally(() => (avatarSubmitBtn.textContent = "Сохранить"))
    .catch((error) => {
      console.log(error);
    });
}

// Adding event listeners

profileAddBtn.addEventListener("click", () => {
  openPopup(newCardPopup);
  toggleButtonState(
    [placeNameInput, placeURLInput],
    newCardSubmitBtn,
    selectors
  );
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

profileEditBtn.addEventListener("click", () => {
  setProfileValue();
  openPopup(profilePopup);
});

profileAvatar.addEventListener("click", () => {
  openPopup(newAvatarPopup);
});

profileFormElement.addEventListener("submit", profileFormSubmitHandler);

cardFormElement.addEventListener("submit", (evt) => {
  newCardFormSubmitHandler(evt);
  disableButton(newCardSubmitBtn, selectors);
});

newAvatarFormElement.addEventListener("submit", newAvatarFormSubmitHandler);

// Enabling validation
enableValidation(selectors);

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    api.setUserId(user._id);
    profileName.textContent = user.name;
    profileAbout.textContent = user.about;
    changeAvatar(user.avatar);

    renderInitialCards(cards, cardsContainer, cardTemplate);
  })
  .catch((error) => {
    console.error(error);
  });
