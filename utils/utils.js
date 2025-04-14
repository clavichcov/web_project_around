/*import  {Card} from '../components/card.js';
import { FormValidator } from '../components/FormValidator.js';
import {form, popup, inputName, inputExtra, buttonElement, cardTrash} from '../utils/constants.js';
        

const handleEditProfileClick = () => {
    
    document.querySelector('.form__title').textContent = 'Editar perfil';
    document.querySelector('.form__input-name').placeholder = 'Nombre';
    document.querySelector(".form__submit-button").textContent = 'Guardar';
    inputExtra.placeholder = 'Acerca de mí';
    inputExtra.type = 'text';    
    popup.classList.add('popup__opened');
    document.addEventListener('keydown', handleEscapeKeyPopupClose);
    const textTitle = document.querySelector('.profile__title');
    const textText = document.querySelector('.profile__text');
    const loaderTimeout = 2000;
    setTimeout(() => {
                inputName.value = textTitle.textContent;
                inputExtra.value = textText.textContent;
                const validatorProfile = new FormValidator(
                    form, 
                    [inputName, inputExtra], 
                    buttonElement
                );
                validatorProfile.enableValidation();
                validatorProfile._toggleButtonState();
    }, loaderTimeout);
    inputName.maxLength = 40;
    inputName.minLength = 2;
    inputExtra.maxLength = 200;
    inputExtra.minLength = 2;
    const validatorProfile = new FormValidator(
        form, 
        [inputName, inputExtra], 
        buttonElement
    );
    validatorProfile.enableValidation();
    validatorProfile._toggleButtonState();
    
}
const handleAddPlaceClick = () => {
    
    document.querySelector('.form__input').placeholder = 'Título';
    document.querySelector(".form__submit-button").textContent = 'Crear';
    inputExtra.placeholder = 'Enlace a la imagen';
    inputExtra.type = 'url'; 
    popup.classList.add('popup__opened');
    document.addEventListener('keydown', handleEscapeKeyPopupClose);
    FormValidator;
    const validatorProfile = new FormValidator(
        form, 
        [inputName, inputExtra], 
        buttonElement
    );
    validatorProfile.enableValidation();
    validatorProfile._toggleButtonState();
}

const popupClose = () => {
        form.reset();
        popup.classList.remove('popup__opened');
        inputName.value = '';
        inputExtra.value = '';
        document.removeEventListener('keydown', handleEscapeKeyPopupClose);
}

const handleEscapeKeyPopupClose = (evt) => {
    if (evt.key === 'Escape') {
        popupClose();
    }
    
}

const handleOutsideClick = (event) => {
    if (event.target === popup) {
        popupClose();
    }
}

form.addEventListener ('submit', (event) => {
    event.preventDefault();
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
});



export { handleEditProfileClick, handleAddPlaceClick, popupClose as clickPopupClose, handleEscapeKeyPopupClose, handleOutsideClick };*/