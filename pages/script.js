// Importaciones de exports nombrados (clases individuales)
import { Card } from '../components/card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/userinfo.js';
import {cardsItems,  cardElements, editProfileButton, addPlaceButton, popupClose } from '../utils/constants.js';
import {PopupWithFormAddPlace, PopupWithFormProfile } from '../components/PopupWithForms.js';
// Importacion de export por defecto 
import  PopupWithImage  from '../components/PopupWithImage.js';

/*import { handleEditProfileClick, handleAddPlaceClick, clickPopupClose, handleEscapeKeyPopupClose, handleOutsideClick} from '../utils/utils.js';*/


document.addEventListener('DOMContentLoaded', () => {
    
    const popupWithImage = new PopupWithImage('#image-popup');
    // Nueva instancia de CardList con los elementos de cardsItems y el renderizador de card
    const cardList = new Section({
        items: cardsItems,
        renderer: (item) => {
            const card = new Card(
                item.name, 
                item.link, 
                '.card',(name, link)  => popupWithImage.open(name, link));
            cardList.addItem(card.getView());
        }
    }, '.elements');
    // Nueva instancia de userInfo para manejar la información del usuario
    const userInfo = new UserInfo({
        name: '.profile__title',
        text: '.profile__text'
                
    });
    //Nueva instancia de PopupWithImage para manejar el modal de imagen
    
    document.querySelectorAll('.card__image').forEach((image) => {
        image.addEventListener('click', () => {
            const cardTitle = image.closest('.card__container').querySelector('.card__title').textContent;
            const cardImage = image.src;
            
        });
    });

    //Nueva instancia de PopupWithForms para manejar el formulario del perfil
    const popupWithFormProfile = new PopupWithFormProfile('#popup-edit', {
        _handleFormSubmit: (data) => {
        const profileTitle = document.querySelector('.profile__title');
        const profileText = document.querySelector('.profile__text');
        profileTitle.textContent = data.name;
        profileText.textContent = data.extra;
        
        }
    });

    const popupWithFormAddPlace = new PopupWithFormAddPlace('#popup-edit', {
        _handleFormSubmit: (data) => {
            const card = new Card(
                data.name, 
                data.link, 
                '.card',(name, link)  => popupWithImage.open(name, link));
            cardList.addItem(card.getView());
        }
    });
    // Renderiza los elementos de cardsItems en el contenedor .elements de la página web
    cardList.renderItems();

    
    editProfileButton.addEventListener('click', () => {popupWithFormProfile.open();});
    addPlaceButton.addEventListener('click', () => {popupWithFormAddPlace.open();});
    //addPlaceButton.addEventListener('click', handleAddPlaceClick);
    /*popupClose.addEventListener('click', clickPopupClose);
    document.addEventListener('keydown', handleEscapeKeyPopupClose);
    document.addEventListener('click', handleOutsideClick);*/
    
});
