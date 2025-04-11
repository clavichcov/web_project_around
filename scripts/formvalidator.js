export class FormValidator {
    constructor(formElement, inputElements, buttonElement) {
        this._formElement = formElement;
        this._inputElements = Array.from(inputElements);
        this._buttonElement = buttonElement;

    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add("form__input_type_error");
        errorElement.textContent = errorMessage;
        errorElement.classList.add("form__input_error_active");
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove("form__input_type_error");
        errorElement.classList.remove("form__input_error_active");
        errorElement.textContent = '';
    }

    _clearSpan(inputElement){
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        if (errorElement) {
            errorElement.textContent = "";
        }
        inputElement.classList.remove("form__input_type_error");
        errorElement.classList.remove("form__input_error_active");
    }

    _checkInputValidity(inputElement) {
        if (inputElement.type === 'url' && !this._isValidUrl(inputElement.value)) {
            this._showInputError(inputElement, "Debe ser una URL válida");
          } else if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
          } else {
            this._hideInputError(inputElement);
          }
    }

    _isValidUrl(url) {
        try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
    }
    
    _hasInvalidInput() {
        return this._inputElements.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add("form__button_inactive");
            this._buttonElement.classList.remove("form__button_active");
            this._buttonElement.disabled = true;
          } else {
            this._buttonElement.classList.remove("form__button_inactive");
            this._buttonElement.classList.add("form__button_active");
            this._buttonElement.disabled = false;
            
          }
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
        this._toggleButtonState();
    }

    _setEventListeners() {
        this._inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
        
    }
}

