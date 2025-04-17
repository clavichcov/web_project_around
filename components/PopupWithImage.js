import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('#modal-image');
        this._caption = this._popup.querySelector('#modal-title');
        this._imageCloseButton = this._popup.querySelector('#popup-close-button')
        this._imageCloseButton.addEventListener('click', () => this.close());
    }

    open(name, link) {
        this._image.src = link;
        this._image.alt = name;
        this._caption.textContent = name;
        this._popup.classList.add('popup__opened_img');
        this._imageCloseButton.classList.add('popup__close-button-img');
        super.open();
        
    }

    close() {
        this._popup.classList.remove('popup__opened_img');
        this._imageCloseButton.classList.remove('popup__close-button-img');
        super.close();
        
    }

    
}