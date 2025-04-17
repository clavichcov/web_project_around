// Este archivo contiene la clase Popup, que se encarga de manejar la apertura y cierre de los popups en la aplicación.
// La clase tiene métodos para abrir y cerrar el popup, así como para manejar eventos de teclado y clics en el overlay.
export default class Popup {
    // El constructor recibe el selector del popup y lo inicializa.
    // También inicializa los elementos del popup y los métodos para manejar eventos.
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }
    // El método open abre el popup y agrega los eventos de teclado y clic al overlay.
    open() {
        
        //this._form.reset();
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
    }
    // El método close cierra el popup, elimina los eventos de teclado y clic del overlay; quita la clase popup_opened.
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
    // El método _handleEscClose cierra el popup cuando se presiona la tecla Escape.
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    // El método _handleOverlayClose cierra el popup cuando se hace clic en el overlay.
    _handleOverlayClose(evt) {
        if (evt.target === this._popup) {
            this.close();
        }
    }
    // El método setEventListeners agrega los event listeners al botón de cerrar.
    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
    }
}