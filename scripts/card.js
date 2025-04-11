class Card {
    constructor (title, imageUrl, cardSelector) {
        this._title = title;
        this._imageUrl = imageUrl;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        return document
        .querySelector(this._cardSelector)
        .content.querySelector('.element')
        .cloneNode(true);
        
    }

    _handleClick() {
        const modal = document.getElementById('modalid');
        const modalImg = document.getElementById('modal_image_content');
        const modalTitle = document.getElementById('modal_image_title');
    
        modalImg.src = this._imageUrl; 
        modalTitle.textContent = this._title;
        modal.classList.add('modal_opened');
    }
        _handleLike() {
        this._likeButton.classList.toggle('element__button_like-active');
    }

    _handleDelete() {
        this._element.remove();
    }

    _handleModalClose () {
        document.getElementById('modalid').classList.remove('modal_opened');
        
    }

    _handleOutsideClick (event) {
        const modal = document.getElementById('modalid');
        if (event.target == modal) {
            this._handleModalClose();
        }
    }


    getView(){
        this._element = this._getTemplate();
        this._element.querySelector('.element__text').textContent = this._title;
        this._element.querySelector('.element__image').src = this._imageUrl;
        this._setEventListeners();
        return this._element;
    }
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__button_like');
        this._likeButton.addEventListener('click', () => this._handleLike());
        this._deleteButton = this._element.querySelector('.element__trash');
        this._deleteButton.addEventListener('click', () => this._handleDelete());
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.addEventListener('click', () => this._handleClick());
        const modalClose = document.getElementById('modal_button_close');
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