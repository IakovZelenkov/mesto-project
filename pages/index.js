let profile = document.querySelector(".profile");
let profileEditBtn = profile.querySelector(".profile__edit-button");

let popup = document.querySelector(".popup");
let popupCloseBtn = document.querySelector(".popup__close-button");

let cardLikeBtns = document
  .querySelectorAll(".card__like-button")
  .forEach((LikeBtn) => {
    LikeBtn.addEventListener("click", function () {
      LikeBtn.classList.toggle("card__like-button_active");
    });
  });

function popupToggle() {
  formValue();
  popup.classList.toggle("popup_opened");
}

profileEditBtn.addEventListener("click", popupToggle);
popupCloseBtn.addEventListener("click", popupToggle);

let form = document.querySelector(".form");

function formValue() {
  let profileName = profile.querySelector(".profile__name").textContent;
  let profileOccupation = profile.querySelector(
    ".profile__occupation"
  ).textContent;

  let formName = form.querySelector("#name");
  let formOccupation = form.querySelector("#occupation");

  formName.setAttribute("value", profileName);
  formOccupation.setAttribute("value", profileOccupation);
}
