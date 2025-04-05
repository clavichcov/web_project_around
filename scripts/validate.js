//Codigo para validacion de campos de formulario

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  };
  
   const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  };

  export const clearSpan = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
      errorElement.textContent = "";
    }
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
  };

  
   const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.type === 'url' && !isValidUrl(inputElement.value)) {
        showInputError(formElement, inputElement, "Debe ser una URL válida");
      } else if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
    };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
   const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
   export const toggleButtonState = (inputList, buttonElement) => {
    console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("button_inactive");
      buttonElement.disabled = true;
      buttonElement.style.backgroundColor = "#FFFFFF";
    } else {
      buttonElement.classList.remove("button_inactive");
      buttonElement.disabled = false;
      buttonElement.style.backgroundColor = "#000000";
    }
  };
  
  /*const toggleButtonState = (inputList, buttonElement) => {
    const hasError = inputList.some(input => !input.validity.valid);
    buttonElement.disabled = hasError;
  };*/

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__submit");
    toggleButtonState(inputList,buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
   export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".form"));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement);
      /*const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));
  
      fieldsetList.forEach((fieldset) => {
        setEventListeners(fieldset);
      });*/
    });
  };
  
  //enableValidation();
  //document.addEventListener('DOMContentLoaded', enableValidation);
  