import Popup from './Popup.js';
import { FormValidator } from './FormValidator.js';
import {Card} from './card.js';
export class PopupWithFormProfile extends Popup {
    constructor(popupSelector)  {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._popup.querySelector('.form__submit-button');
        this._formCloseButton = this._popup.querySelector('#popup-close')
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._handleFormSubmitProfile(inputValues);
            this.close();
        });
        this._validator = new FormValidator({
            form: this._form,
            submitButton: this._submitButton
        });
        this._validator.enableValidation();
        this._formCloseButton.addEventListener('click', () => this.close());
    }
    _getInputValues() {
        const inputValues = {};
        const inputs = Array.from(this._form.querySelectorAll('.form__input'));
        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        console.log(inputValues);
        return inputValues;
        
    }

    _handleFormSubmitProfile (data)  {
        const profileTitle = document.querySelector('.profile__title');
        const profileText = document.querySelector('.profile__text');
        profileTitle.textContent = data.name;
        profileText.textContent = data.extra;
        
        }
    open() {
        super.open();
        this._popup.classList.add('popup__opened_form');
        this._submitButton.classList.remove('form__submit-button-place');
        this._submitButton.classList.add('form__submit-button-profile');
        this._popup.querySelector('#form-title-name').textContent = "Editar Perfil";
        this._popup.querySelector('#form-input-name').placeholder = "Nombre";
        this._popup.querySelector('#form-input-name').value = document.querySelector('.profile__title').textContent;
        this._popup.querySelector('#form-input-extra').type = "text";
        this._popup.querySelector('#form-input-extra').value = document.querySelector('.profile__text').textContent;
        this._popup.querySelector('#form-input-extra').placeholder = "Acerca de mí";
        this._popup.querySelector('#form-button-submit').textContent = "Guardar";
        this._popup.querySelector('#form-input-name').maxLength = 40;
        this._popup.querySelector('#form-input-name').minLength = 2;
        this._popup.querySelector('#form-input-extra').maxLength = 200;
        this._popup.querySelector('#form-input-extra').minLength = 2;
        this._formCloseButton.classList.add('popup__close-button-form');
        const inputName = this._popup.querySelector('#form-input-name');
        const inputExtra = this._popup.querySelector('#form-input-extra');
        const validatorProfile = new FormValidator(
            
            this._form, 
            [inputName, inputExtra], 
            this._submitButton
        );
        validatorProfile.enableValidation();
        validatorProfile._toggleButtonState();
        
    }
    close() {
        super.close();
        this._form.reset();
    }
    _setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }
}

export class PopupWithFormAddPlace extends Popup {
    constructor (popupSelector, ) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._popup.querySelector('.form__submit-button');
        this._formCloseButton = this._popup.querySelector('#popup-close')
        this._formCloseButton.addEventListener('click', () => this.close());
    }
    _getInputValues() {
        const inputValues = {};
        const inputs = this._form.querySelectorAll('.form__input');
        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    
    open() {
        super.open();
        this._popup.classList.add('popup__opened_form');
        this._submitButton.classList.remove('form__submit-button-profile');
        this._submitButton.classList.add('form__submit-button-place');
        this._popup.querySelector('#form-title-name').textContent = "Nuevo Lugar";
        this._popup.querySelector('#form-input-name').placeholder = "Titulo";
        this._popup.querySelector('#form-input-extra').type = "url";
        this._popup.querySelector('#form-input-extra').placeholder = "Enlace a la imagen";
        this._popup.querySelector('#form-button-submit').textContent = "Crear";
        this._popup.querySelector('#form-input-name').maxLength = 40;
        this._popup.querySelector('#form-input-name').minLength = 2;
        this._popup.querySelector('#form-input-extra').minLength = 2;
        this._formCloseButton.classList.add('popup__close-button-form');
        const inputName = this._popup.querySelector('#form-input-name');
        const inputExtra = this._popup.querySelector('#form-input-extra');
        const validatorProfile = new FormValidator(
            
            this._form, 
            [
                this._popup.querySelector('#form-input-name'),
                this._popup.querySelector('#form-input-extra')
            ], 
            this._submitButton
        );
        validatorProfile.enableValidation();
        validatorProfile._toggleButtonState();
        
    }
    close() {
        super.close();
        this._form.reset();
    }
    _setEventListeners() {
        super.setEventListeners();
        if (inputExtra.type === "text") {
            const profileTitle = document.querySelector('.profile__title');
            const profileText = document.querySelector('.profile__text');
            profileTitle.textContent = inputName.value;
            profileText.textContent = inputExtra.value;
            popupClose();
        } else if (inputExtra.type === "url") {
            const card = new Card(inputName.value, inputExtra.value, '.card');
            const cardElements = document.querySelector(".elements");
            cardElements.prepend(card.getView());
            popupClose();
        }
    }
}