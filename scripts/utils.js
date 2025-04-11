import  {Card} from './card.js';
import { FormValidator } from './FormValidator.js';
const form = document.querySelector('.form');
const popup = document.querySelector('.popup');
const inputName = document.getElementById('form_input_name');
const inputExtra = document.querySelector('.form__input_extra');
const buttonElement = form.querySelector(".form__button_submit");
const cardTrash = document.querySelector('.element__trash');
        

const handleEditProfileClick = () => {
    const popup = document.querySelector('.popup');
    const inputName = document.getElementById('form_input_name');
    const extraInput = document.querySelector('.form__input_extra');
    document.getElementById('form_title_name').textContent = 'Editar perfil';
    document.getElementById('form_input_name').placeholder = 'Nombre';
    document.getElementById("form_button_submit").textContent = 'Guardar';
    extraInput.placeholder = 'Acerca de mí';
    extraInput.type = 'text';    
    popup.classList.add('popup_opened');
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
    const popup = document.querySelector('.popup');
    const extraInput = document.querySelector('.form__input_extra');
    document.getElementById('form_input_name').placeholder = 'Título';
    document.getElementById("form_button_submit").textContent = 'Crear';
    extraInput.placeholder = 'Enlace a la imagen';
    extraInput.type = 'url'; 
    popup.classList.add('popup_opened');
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
        popup.classList.remove('popup_opened');
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
        const card = new Card(inputName.value, inputExtra.value, '.default-card');
        const cardElements = document.querySelector(".elements");
        cardElements.prepend(card.getView());
        popupClose();
    }
});



export { handleEditProfileClick, handleAddPlaceClick, popupClose as clickPopupClose, handleEscapeKeyPopupClose, handleOutsideClick };