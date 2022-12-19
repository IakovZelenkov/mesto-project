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
  formSubmitBtn,
  newCardSumbitBtn,
} from "./utils.js";
import { renderInitialCards, addCard, createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import {
  enableValidation,
  toggleButtonState,
  disableButton,
} from "./validate.js";
import { selectors } from "./data.js";

// Forms
function setProfileValue() {
  nameInput.setAttribute("value", profileName.textContent);
  aboutInput.setAttribute("value", profileAbout.textContent);
  toggleButtonState([nameInput, aboutInput], formSubmitBtn, selectors);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
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

// Adding event listeners
profileAddBtn.addEventListener("click", () => {
  openPopup(newCardPopup);
  toggleButtonState([placeNameInput, placeURLInput], formSubmitBtn, selectors);
});
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
profileEditBtn.addEventListener("click", () => {
  setProfileValue();
  openPopup(profilePopup);
});
profileFormElement.addEventListener("submit", profileFormSubmitHandler);
cardFormElement.addEventListener("submit", (evt) => {
  newCardFormSubmitHandler(evt);
  disableButton(newCardSumbitBtn, selectors);
});

// Render cards from inital set
renderInitialCards(cardsContainer, cardTemplate);

// Enabling validation
enableValidation(selectors);
