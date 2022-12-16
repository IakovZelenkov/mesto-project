import { initialCards } from "./data.js";
import { createPicturePopup, openPopup } from "./modal.js";
import { picturePopup } from "./index.js";

function addCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}

function removeCard(evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
}

function toggleLikeButton(evt) {
  const likeButton = evt.target.closest(".card__like-button");
  likeButton.classList.toggle("card__like-button_active");
}

function createCard(name, link, cardTemplate) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    createPicturePopup(name, link);
    openPopup(picturePopup);
  });
  cardElement.querySelector(".card__title").textContent = name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", toggleLikeButton);
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);
  return cardElement;
}

function renderInitialCards(cardsContainer, cardTemplate) {
  initialCards.forEach((item) => {
    addCard(createCard(item.name, item.link, cardTemplate), cardsContainer);
  });
}

export { createCard, renderInitialCards, addCard };

//TODO work on card modals
