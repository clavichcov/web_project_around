// Importaciones de exports nombrados (clases individuales)
import { Card } from '../components/card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/userinfo.js';
import {cardsItems,  cardElements, editProfileButton, addPlaceButton, popupClose } from '../utils/constants.js';
import {PopupWithForm } from '../components/PopupWithForms.js';
// Importacion de export por defecto 
import  PopupWithImage  from '../components/PopupWithImage.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const popupWithImage = new PopupWithImage('#popup-image');
    // Nueva instancia de CardList con los elementos de cardsItems y el renderizador de card
    const cardList = new Section({
        items: cardsItems,
        renderer: (item) => {
            const card = new Card(
                item.name, 
                item.link, 
                '#card-template',(name, link)  => popupWithImage.open(name, link));
                cardList.addItem(card.getView());
        }
    }, '.elements');
    cardList.renderItems();
    
    // Nueva instancia de userInfo para manejar la información del usuario
    
    const userInfo = new UserInfo({
        name: '.profile__title',
        about: '.profile__text'
    });    
        
    //Nueva instancia de PopupWithForms para manejar el formulario del perfil
    const popupWithForm = new PopupWithForm('#popup-edit', {
        handleFormSubmit: (data) => {
          if (popupWithForm._formType === 'profile') {
            userInfo.setUserInfo({
              name: data.name,
              about: data.extra
            });
          } else if (popupWithForm._formType === 'place') {
            const card = new Card(
              data.name,
              data.extra,
              '#card-template',
              (name, link) => popupWithImage.open(name, link)
            );
            cardList.addItem(card.getView());
          }
        }
      });
    
    
      editProfileButton.addEventListener('click', () => {
        popupWithForm.setFormType('profile', userInfo);
        popupWithForm.open();
      });
      addPlaceButton.addEventListener('click', () => {
        popupWithForm.setFormType('place');
        popupWithForm.open()
    });
    
});
