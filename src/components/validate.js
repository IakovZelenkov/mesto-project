import {
  cardsContainer,
  cardTemplate,
  profilePopup,
  newCardPopup,
  placeNameInput,
  placeURLInput,
  profileName,
  profileJob,
  nameInput,
  jobInput,
} from "./index.js";
import { closePopup } from "./modal.js";
import { addCard, createCard } from "./card.js";

function setFormValue() {
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", profileJob.textContent);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(
    createCard(placeNameInput.value, placeURLInput.value, cardTemplate),
    cardsContainer
  );
  closePopup(newCardPopup);
  evt.target.reset();
}

export { setFormValue, profileFormSubmitHandler, newCardFormSubmitHandler };
