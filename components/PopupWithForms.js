import Popup from './Popup.js';
import { FormValidator } from './FormValidator.js';
import { UserInfo } from './userinfo.js';
import { inputName, inputExtra } from '../utils/constants.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit, formType, userInfo }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formType = formType;
        this._userInfo = userInfo;
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._popup.querySelector('.form__submit-button');
        this._closeButton = this._popup.querySelector('#popup-close');
        
        this._setEventListeners();
      
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
      
          if (this._formType === 'profile') {
            this._handleFormSubmit(this._getInputValues());
          } else if (this._formType === 'place') {
            this._handleFormSubmit(this._getInputValues());
          }
      
          this.close();
        });
      
        this._closeButton.addEventListener('click', () => this.close());
      }
    open() {
      super.open();
      this._form.reset();
      if (this._formType === 'profile') {
            this._configureAsProfileForm();
            this._popup.classList.add('popup__opened_form');
            this._closeButton.classList.add('popup__close-button-form');
            const { name, about } = this._userInfo.getUserInfo();
            const nameInput = this._form.querySelector('#form-input-name');
            const extraInput = this._form.querySelector('#form-input-extra');
            nameInput.value = name;
            extraInput.value = about;
      } else if (this._formType === 'place') {
                    this._configureAsPlaceForm();
                    this._popup.classList.add('popup__opened_img');
                    this._closeButton.classList.add('popup__close-button-form');
      }
      const validatorProfile = new FormValidator(
        this._form, 
        [inputName, inputExtra], 
        this._submitButton
        
        );
        validatorProfile.enableValidation();
        validatorProfile._toggleButtonState();
    }

    setFormType(formType, userInfo = null) {
        this._formType = formType;
        this._userInfo = userInfo;
      }
  
    _configureAsProfileForm() {
      this._submitButton.textContent = 'Guardar';
      this._submitButton.classList.add('form__submit-button-profile');
      this._submitButton.classList.remove('form__submit-button-place');

      const nameInput = this._form.querySelector('#form-input-name');
      const extraInput = this._form.querySelector('#form-input-extra');
      nameInput.placeholder = 'Nombre';
      extraInput.placeholder = 'Acerca de mí';
      extraInput.type = 'text';
      this._popup.querySelector('#form-input-name').maxLength = 40;
      this._popup.querySelector('#form-input-name').minLength = 2;
      this._popup.querySelector('#form-input-extra').maxLength = 200;
      this._popup.querySelector('#form-input-extra').minLength = 2;
      
    }
  
    _configureAsPlaceForm() {
      this._submitButton.textContent = 'Crear';
      this._submitButton.classList.remove('form__submit-button-profile');
      this._submitButton.classList.add('form__submit-button-place');
      const nameInput = this._form.querySelector('#form-input-name');
      const extraInput = this._form.querySelector('#form-input-extra');
      nameInput.placeholder = 'Título';
      extraInput.placeholder = 'Enlace a la imagen';
      extraInput.type = 'url';
      nameInput.value = '';
      extraInput.value = '';
      
      this._popup.querySelector('#form-input-name').maxLength = 30;
      this._popup.querySelector('#form-input-name').minLength = 2;
      this._popup.querySelector('#form-input-extra').minLength = 2;
    }
  
    _getInputValues() {
        const inputValues = {};
        const inputs = Array.from(this._form.querySelectorAll('.form__input'));
        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
        
    }
    close() {
        super.close();
        this._form.reset();
    }
  }