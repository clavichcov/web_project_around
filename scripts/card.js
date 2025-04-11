class Card {
    constructor (title, imageUrl, cardSelector) {
        this._title = title;
        this._imageUrl = imageUrl;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        return document
        .querySelector('template')
        .content.querySelector('.card__container')
        .cloneNode(true);
        
    }

    _handleClick() {
        const modal = document.querySelector('.modal');
        const modalImg = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
    
        modalImg.src = this._imageUrl; 
        modalTitle.textContent = this._title;
        modal.classList.add('modal__opened');
    }
        _handleLike() {
        this._likeButton.classList.toggle('card__like-button-active');
    }

    _handleDelete() {
        this._element.remove();
    }

    _handleModalClose () {
        document.querySelector('.modal').classList.remove('modal__opened');
        
    }

    _handleOutsideClick (event) {
        const modal = document.querySelector('.modal');
        if (event.target == modal) {
            this._handleModalClose();
        }
    }


    getView(){
        this._element = this._getTemplate();
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').src = this._imageUrl;
        this._setEventListeners();
        return this._element;
    }
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeButton.addEventListener('click', () => this._handleLike());
        this._deleteButton = this._element.querySelector('.card__delete-button');
        this._deleteButton.addEventListener('click', () => this._handleDelete());
        this._elementImage = this._element.querySelector('.card__image');
        this._elementImage.addEventListener('click', () => this._handleClick());
        const modalClose = document.getElementById('modal-close-button');
        modalClose.addEventListener('click', () => {this._handleModalClose()});
        document.addEventListener('click', () => {this._handleOutsideClick(event)});
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape' ) {
                this._handleModalClose();
            }
        });
        
    }
}
export {Card};