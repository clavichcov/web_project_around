
const cardElements = document.querySelector(".elements");
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__addPlace');
const popupClose = document.querySelector('.popup__close');
const form = document.querySelector('.form');
const popup = document.querySelector('.popup');
const inputNameProfile = document.querySelector('.form__input_name');
const inputAboutProfile = document.querySelector('.form__input_about');
const inputNamePlace = document.querySelector('.form__input_name-place');
const inputUrlPlace = document.querySelector('.form__input_url-place');
const inputUrlImgProfile = document.querySelector('.form__input_imgprofile-url');
const changeImgProfile = document.querySelector('.profile__overlay');
const buttonElement = form.querySelector(".form__submit-button");



export { cardElements, editProfileButton, addPlaceButton, inputNamePlace, inputUrlPlace, inputUrlImgProfile, changeImgProfile, popupClose, form,
     popup, inputNameProfile, inputAboutProfile, buttonElement };