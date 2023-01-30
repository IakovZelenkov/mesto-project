export default class Card {
    constructor (card, selector, userId, handleOpenImage, handleToggleLike, handleDelete){
        this._likes = card.likes;
        this._name = card.name;
        this._image = card.link;
        this._cardId = card._id;
        this._ownerId = card.owner._id;
        this._selector = selector;
        this._userId = userId;

        this._handleToggleLike = handleToggleLike;
        this._handleDelete = handleDelete;
        this._handleOpenImage = handleOpenImage;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners(){
        this._likeButton.addEventListener("click", () => {
            this._handleToggleLike(this._likeButton, this._cardId );
        })

        this._cardImage.addEventListener("click", () => {
            this._handleOpenImage(this._image, this._name);
        })

        this._deleteButton.addEventListener("click", () => {
            this._handleDelete(this._cardId);
        })
    }

    generate(){
        this._card = this._getElement();

        this._cardImage = this._card.querySelector('.card__image');
        this._cardImage.src = this._image;
        this._cardImage.alt = this._name;
        
        this._cardName = this._card.querySelector('.card__title');
        this._cardName.textContent = this._name;
        
        this._deleteButton = this._card.querySelector('.card__delete-button');
        this._likeButton = this._card.querySelector('.card__like-button');
        this._likesCountText = this._card.querySelector('.card__like-button-count');
        this._likesCountText.textContent = this._likes.length;
        this._likedByUser();
        this._setDeleteButton();
        this._setEventListeners();

        return this._card;
    }


    _likedByUser(){
        if (this._likes.some(like => like._id === this._userId)){
            this._likeButton.classList.add('card__like-button_active');
        }; 
    }

    updateLike(likeCount){
        this._likeButton.classList.toggle('card__like-button_active')
        this._likesCountText.textContent = likeCount;
    }

    delete(){
        this._card.remove()
    }

    _setDeleteButton(){
        if (this._userId !== this._ownerId){
            this._deleteButton.classList.add('card__delete-button_hidden');
        }
    }
}