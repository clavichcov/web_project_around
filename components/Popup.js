
export default class Popup {
    
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }
    
    open() {
                
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
    }
    
    close() {
        
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose);
        if (this._popup.classList.contains('popup__opened_img')) {
            this._popup.classList.remove('popup__opened_img');
        } else {
            if (this._popup.classList.contains('popup__opened_form')) {
                this._popup.classList.remove('popup__opened_form');
            }
        }
        
    }
    
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    
    _handleOverlayClose(evt) {
        if (evt.target === this._popup) {
            this.close();
        }
    }
    
    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
    }
}