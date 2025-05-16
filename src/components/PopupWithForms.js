import Popup from './Popup.js';
import { FormValidator } from './FormValidator.js';

import { inputNameProfile, inputAboutProfile, inputNamePlace, inputUrlPlace, inputUrlImgProfile } from '../utils/constants.js';

  class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit, formType, userInfo, cardList }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formType = formType;
        this._userInfo = userInfo;
        this._cardList = cardList;
        if (this._formType ==="profileEdit"){
          this._form = this._popup.querySelector('.form__profile');
          this._submitButton = this._popup.querySelector('.form__profile_submit');
          this._closeButton = this._popup.querySelector('#popup--close-button');
          this._submitButtonText = this._submitButton.textContent;
        } else if (this._formType ==="addPlace") {
          this._form = this._popup.querySelector('.form__place');
          this._submitButton = this._popup.querySelector('.form__place_submit');
          this._closeButton = this._popup.querySelector('#popup--close-button');
          } else if (this._formType ==="cardDelete") {
          this._form = this._popup.querySelector('.form__card_delete');
          this._submitButton = this._popup.querySelector('.form__submit_card-delete-button');
          this._closeButton = this._popup.querySelector('#popup--close-button');
        } else if (this._formType ==="changeImgProfile") {
          this._form = this._popup.querySelector('.form__change_imgprofile');
          this._submitButton = this._popup.querySelector('.form__change_imgprofile-button');
          this._closeButton = this._popup.querySelector('#popup--close-button');
          
        }
        this._setEventListeners();
      
    }

    _showLoading(isLoading) {
      if (isLoading) {
        if(this._formType ==="profileEdit"){
          const loadingText = 'Guardando...';
          this._submitButton.textContent = loadingText;
          this._submitButton.disabled = true;
        } else if (this._formType ==="addPlace") {
          const loadingText = 'Creando...'
          this._submitButton.textContent = loadingText;
          this._submitButton.disabled = true;
        } else if (this._formType ==="changeImgProfile") {
          const loadingText = 'Guardando...';
          this._submitButton.textContent = loadingText;
          this._submitButton.disabled = true;
        }
      } else {
          this._submitButton.textContent = this._submitButtonText;
          this._submitButton.disabled = false;
      }
  }
    _setEventListeners() {
      super.setEventListeners();
      if (this._formType ==="profileEdit"){
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._showLoading(true);
          this._handleFormSubmit(this._getInputValues())
          .then(()=> {
            this._userInfo.setUserInfo(this._getInputValues());
            const formType = this._formType;
            this.close(formType);
          })
          .catch(err => {
            console.error('Error al actualizar el perfil:', err)
          })
          .finally(() => {
            this._showLoading(false);
          });
          
          
        });
        this._closeButton.addEventListener('click', (formType) => {
          this.close(formType);
        });
      } else if (this._formType ==="addPlace") {
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._showLoading(true);
          this._handleFormSubmit(this._getInputValues())
          .then(() => {
            const formType = this._formType;
            this.close(formType);
          })
          .catch(err => {
            console.error('Error al añadir tarjeta:', err)
          })
          .finally(() => {
            this._showLoading(false)
          });
          
        });
        this._closeButton.addEventListener('click', (formType) => {
          this.close(formType);
        });
      } else if (this._formType ==="cardDelete") {
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit();
          this.close();
        });
        this._closeButton.addEventListener('click', (formType) => {
          this.close(formType);
        });
      } else if (this._formType ==="changeImgProfile") {
        this._form = this._popup.querySelector('.form__change_imgprofile');
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._showLoading(true);
          this._handleFormSubmit(this._getInputValues())
          .then(() => {
            const formType = this._formType;
            this.close(formType);
          })
          .catch(err => {
            console.error('Error al actualizar la imagen de perfil:', err)
          })
          .finally(() => {
            this._showLoading(false);
          });
          
        });
        this._closeButton.addEventListener('click', (formType) => {
          this.close(formType);
        });
      }
        
      }
    open() {
      super.open();
      
      if (this._formType === 'profileEdit') {
            this._popup.classList.add('popup__profile_opened');
            const { name, about } = this._userInfo.getUserInfo();
            const nameInput = this._form.querySelector('#form--profile-input-name');
            const aboutInput = this._form.querySelector('#form--profile-input-about');
            nameInput.value = name;
            aboutInput.value = about;
            const validatorProfile = new FormValidator(
              this._form, 
              [inputNameProfile, inputAboutProfile], 
              this._submitButton
              
            );
            validatorProfile.enableValidation();
            
      } else if (this._formType === 'addPlace') {
                this._popup.classList.add('popup__addPlace_opened');
                const nameInput = this._form.querySelector('#form--input-name-place');
                const placeInput = this._form.querySelector('#form--input-url-place');
                nameInput.value = '';
                placeInput.value = '';
                const validatorPlace = new FormValidator(
                  this._form, 
                [inputNamePlace, inputUrlPlace], 
                this._submitButton
                );
                validatorPlace.enableValidation();

        } else if (this._formType === 'changeImgProfile') {
            this._popup.classList.add('popup__change_imgprofile_opened');
            const nameInput = this._form.querySelector('#form--input-change-link');
            nameInput.value = '';
            const validatorChangeImgProfile = new FormValidator(
              this._form, 
            [inputUrlImgProfile], 
            this._submitButton
            );
            validatorChangeImgProfile.enableValidation();
        } else if (this._formType === 'cardDelete') {
            this._popup.classList.add('popup__card_delete_opened');
        }

        
    }

     
    _getInputValues() {
        const inputValues = {};
        const inputs = Array.from(this._form.querySelectorAll('.form__input'));
        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });
    return inputValues;
        
    }
    close(formType) {
        super.close(formType);
        
    }
  }
  export { PopupWithForm }


