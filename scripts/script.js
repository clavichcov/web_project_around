import { Card } from './card.js';
import { handleEditProfileClick, handleAddPlaceClick, clickPopupClose, handleEscapeKeyPopupClose, handleOutsideClick} from './utils.js';
document.addEventListener('DOMContentLoaded', () => {
    const cardsItems = [
        { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
        { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
        { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
        { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
        { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
        { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
    ];
    const cardElements = document.querySelector(".elements");
    const editProfileButton = document.querySelector('.profile__edit');
    const addPlaceButton = document.querySelector('.profile__addPlace');
    const popupClose = document.querySelector('.popup__close');
    
    cardsItems.reverse().forEach((item) => {
        const card = new Card(item.name, item.link, '.card');
        cardElements.appendChild(card.getView());
    });
    
    editProfileButton.addEventListener('click', handleEditProfileClick);
    addPlaceButton.addEventListener('click', handleAddPlaceClick);
    popupClose.addEventListener('click', clickPopupClose);
    document.addEventListener('keydown', handleEscapeKeyPopupClose);
    document.addEventListener('click', handleOutsideClick);
    
    
    
    
});
