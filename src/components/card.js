import { createPicturePopup, openPopup } from "./modal.js";
import { picturePopup } from "./utils.js";
import * as api from "./api.js";

function checkIfLiked(card) {
  return card.likes.some((like) => like._id === api.localConfig.userId);
}

function addCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}

function toggleLikeButton(evt) {
  const likeButton = evt.target.closest(".card__like-button");
  likeButton.classList.toggle("card__like-button_active");
}

function createCard(card, cardTemplate) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-button-count");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", () => {
    createPicturePopup(card.name, card.link);
    openPopup(picturePopup);
  });
  cardTitle.textContent = card.name;
  likeCount.textContent = card.likes.length;

  let isLiked = false;

  if (checkIfLiked(card)) {
    cardLikeBtn.classList.add("card__like-button_active");
    isLiked = true;
  }

  cardLikeBtn.addEventListener("click", (evt) => {
    if (isLiked) {
      api
        .unsetLike(card._id)
        .then((data) => {
          toggleLikeButton(evt);
          likeCount.textContent = data.likes.length;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .setLike(card._id)
        .then((data) => {
          toggleLikeButton(evt);
          likeCount.textContent = data.likes.length;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  if (api.localConfig.userId !== card.owner._id) {
    cardDeleteBtn.classList.add("card__delete-button_hidden");
  } else {
    cardDeleteBtn.addEventListener("click", () => {
      api
        .deleteCard(card._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  return cardElement;
}

function renderInitialCards(cardsObject, cardsContainer, cardTemplate) {
  cardsObject.reverse().forEach((item) => {
    addCard(createCard(item, cardTemplate), cardsContainer);
  });
}

export { addCard, createCard, renderInitialCards };
