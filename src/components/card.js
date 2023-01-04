import { createPicturePopup, openPopup } from "./modal.js";
import { picturePopup } from "./variables.js";
import * as api from "./api.js";

function checkIfLiked(card) {
  return card.likes.some((like) => like._id === api.localConfig.userId);
}

function updateLike(cardLikeBtn, likeCount, count) {
  cardLikeBtn.classList.toggle("card__like-button_active");
  likeCount.textContent = count;
}

function removeCard(card) {
  card.remove();
}

function createCard(card, cardTemplate, likeCallback, cardDeleteCallback) {
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
  // Like btn
  if (checkIfLiked(card)) {
    cardLikeBtn.classList.add("card__like-button_active");
  }
  cardLikeBtn.addEventListener("click", () => {
    likeCallback(cardLikeBtn, likeCount, card._id);
  });
  //Delete btn
  if (api.localConfig.userId !== card.owner._id) {
    cardDeleteBtn.classList.add("card__delete-button_hidden");
  } else {
    cardDeleteBtn.addEventListener("click", () => {
      cardDeleteCallback(cardElement, card._id);
    });
  }
  return cardElement;
}

export { createCard, updateLike, removeCard };
