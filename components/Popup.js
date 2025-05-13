
export default class Popup {
    
    constructor(popupSelector, formType) {
        this._popup = document.querySelector(popupSelector);
        this._formType = formType;
        this._closeButton = this._popup.querySelector('.popup__close_button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }
    
    open() {
                
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
    }
    
    close() {
        if (this._formType ==="profileEdit"){
            this._popup.classList.remove('popup__profile_opened');
            this._form.reset();
          } else if (this._formType ==="addPlace") {
            this._popup.classList.remove('popup__addPlace_opened');
            this._form.reset();
          } else if (this._formType ==="cardDelete") {
            this._popup.classList.remove('popup__card_delete_opened');
            
          } else if (this._formType ==="changeImgProfile") {
            this._popup.classList.remove('popup__change_imgprofile_opened');
            this._form.reset();
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