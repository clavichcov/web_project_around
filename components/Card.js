

   class Card {
    
    constructor (title, imageUrl, cardSelector, handleImageClick) {
        this._title = title;
        this._imageUrl = imageUrl;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }
        _getTemplate() {
        return document
        .querySelector('template')
        .content.querySelector('.card__container')
        .cloneNode(true);
        
    }
    
    _handleLike() {
        this._likeButton.classList.toggle('card__like-button-active');
    }
    
    _handleDelete() {
        this._element.remove();
    }
    
    getView(){
        this._element = this._getTemplate();
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').alt = this._title;
        this._element.querySelector('.card__image').src = this._imageUrl;
        this._setEventListeners();
        return this._element;
    }
    
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeButton.addEventListener('click', () => this._handleLike());
        this._deleteButton = this._element.querySelector('.card__delete-button');
        this._deleteButton.addEventListener('click', () => this._handleDelete());
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick(this._title, this._imageUrl);
        });
                
    }
}

export {Card};