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
import * as api from "./api.js";

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

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  buttonLoading(profileSubmitBtn);
  api
    .updateUserData(nameInput.value, aboutInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileAbout.textContent = userData.about;
      closePopup(profilePopup);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      buttonLoading(profileSubmitBtn, "??????????????????");
    });
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  buttonLoading(newCardSubmitBtn);
  api
    .postNewCard(placeNameInput.value, placeURLInput.value)
    .then((cardData) => {
      addCard(
        createCard(cardData, cardTemplate, cardLikeHandler, cardDeleteHandler),
        cardsContainer
      );
      closePopup(newCardPopup);
      evt.target.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      buttonLoading(newCardSubmitBtn, "??????????????");
    });
}

function newAvatarFormSubmitHandler(evt) {
  evt.preventDefault();
  buttonLoading(avatarSubmitBtn);
  api
    .updateUserAvatar(newAvatarURLInput.value)
    .then((avatarData) => {
      changeAvatar(avatarData.avatar);
      closePopup(newAvatarPopup);
      evt.target.reset();
    })

    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      buttonLoading(avatarSubmitBtn, "??????????????????");
    });
}

// Adding event listeners

profileAddBtn.addEventListener("click", () => {
  openPopup(newCardPopup);
  disableButton(profileSubmitBtn, selectors);
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
