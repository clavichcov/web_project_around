import {apiAcces} from './Api.js'
import { PopupWithForm } from './PopupWithForms.js';
   class Card {
    
    constructor (title, imageUrl, cardSelector, handleImageClick, _id, isLiked, handleDeleteClick) {
        this._title = title;
        this._imageUrl = imageUrl;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._id = _id;
        this._isLiked = isLiked;
        this._handleDeleteClick = handleDeleteClick;
        this._handleConfirmDelete = this._handleConfirmDelete.bind(this);
        this._handleDeleteCard = this._handleDeleteCard.bind(this);
    }
        _getTemplate() {
        return document
        .querySelector('template')
        .content.querySelector('.card__container')
        .cloneNode(true);
        
    }
    
    _handleLike() {
        apiAcces.likeCard(this._id)
        .then(() => {
            
            this._isLiked = true;
            this._updateLikeButton();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    _handleDislike() {
        apiAcces.dislikeCard(this._id)
        .then(() => {
            
            this._isLiked = false;
            this._updateLikeButton();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    _handleDeleteCard() {
        apiAcces.deleteCard(this._id)
        .then(() => {
            this._element.remove();
        })
        .catch(err => {
            console.error('Error al eliminar:', err);
            popupDeleteCard.classList.add('popup__card_delete_opened');
        })
        
    }

    _handleConfirmDelete(evt) {
        evt.preventDefault();
        const popupDeleteCard = document.querySelector('#popup--card-delete');
        const submitDeleteButton = popupDeleteCard.querySelector('.form__submit-delete-button');
        submitDeleteButton.removeEventListener('click', this._handleConfirmDelete);
        this._handleDeleteCard(this._id)
        popupDeleteCard.classList.remove('popup__card_delete_opened');
        
    }
    _updateLikeButton() {
        if (this._isLiked) {
            this._likeButton.classList.add('card__like-button-active');
        } else {
            this._likeButton.classList.remove('card__like-button-active');
        }
    }
    
    _cardDeleteButton() {
        
        const popupWithFormCardDelete = new PopupWithForm('#popup--card-delete', {
            
            handleFormSubmit: () => {
                    const cardId = this._id;
                    console.log('boton presionado');
                    apiAcces.deleteCard(cardId)
                    .then(() => {
                        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
                        if (cardElement) {
                        popupWithFormCardDelete.open();
                        cardElement.remove(cardId);
                        }
                        popupWithFormCardDelete.close();
                    })
                    .catch(err => console.error('Error al eliminar:', err));
           
            },
            formType: 'cardDelete',
        
        });
        popupWithFormCardDelete.open();
    }
    getView(){
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.card__like-button');
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').alt = this._title;
        this._element.querySelector('.card__image').src = this._imageUrl;
        this._updateLikeButton();
        this._setEventListeners();
        return this._element;
    }
    
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeButton.addEventListener('click', () => {
            const isLiked = this._likeButton.classList.contains('card__like-button-active');
            if (isLiked) {
                this._handleDislike();
                            
            } else {
                this._handleLike();
            }
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick(this._title, this._imageUrl);
        });
        this._deleteButton = this._element.querySelector('.card__delete-button');
        this._deleteButton.addEventListener('click', () => {
            this._cardDeleteButton();
            
        });          
         
    }

    

}

export {Card};