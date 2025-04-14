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
const form = document.querySelector('.form');
const popup = document.querySelector('.popup');
const inputName = document.querySelector('.form__input-name');
const inputExtra = document.querySelector('.form__input-extra');
const buttonElement = form.querySelector(".form__submit-button");



export { cardsItems, cardElements, editProfileButton, addPlaceButton, popupClose, form,
     popup, inputName, inputExtra, buttonElement };