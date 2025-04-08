import { Card } from './card.js';
import { handleEditProfileClick, handleAddPlaceClick, clickClose } from './utils.js';
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
    const editButton = document.querySelector('.profile__edit');
    const addPlaceButton = document.querySelector('.profile__addPlace');
    const closePopup = document.querySelector('.popup__close');
    cardsItems.forEach((item) => {
        const card = new Card(item.name, item.link, '.default-card');
        cardElements.appendChild(card.getView());
    });
    editButton.addEventListener('click', handleEditProfileClick);
    addPlaceButton.addEventListener('click', handleAddPlaceClick);
    closePopup.addEventListener('click', clickClose);
});
