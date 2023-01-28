export default class Card {
    constructor (card, selector, handleLike, handleDelete, handleOpenImage){
        this._likes = card.likes;
        this._name = card.name;
        this._image = card.link;
        this._selector = selector;
        // this._cardId = card._id;
        // this._ownerId = card.owner._id;
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

    }

    generate(){
        this._card = this._getElement();

        this._cardImage = this._card.querySelector('.card__image');
        this._cardImage.src = this._image;
        this._cardImage.alt = this._name;
        
        this._cardName = this._card.querySelector('.card__title');
        this._cardName.textContent = this._name;


        return this._card;
        //  this._deleteButton = this._element.querySelector('.card__delete-button');
        // this._likeButton = this._element.querySelector('.card__like-button');
        // this._likesCountText = this._element.querySelector('.card__like-button-count');
        // this._setEventListeners()
        
    }

    // setupLike(data){
    //     this._likes = data.likes;
    //     this._likesCountText.textContent = this._likes.length;
    //     if (true){} //likedByUser
    // }

    // _likedByUser(){
    //     return this._likes.some(like => like._id === userId); //UserId;
    // }
}