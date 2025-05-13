import {apiAcces} from '../components/API.js'
import { Card } from '../components/card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/userinfo.js';
import { editProfileButton, addPlaceButton, changeImgProfile } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForms.js';

import  PopupWithImage  from '../components/PopupWithImage.js';


    let cardList;
    const popupWithImage = new PopupWithImage('#popup-image');
    const userInfo = new UserInfo({
        name: '.profile__title',
        about: '.profile__text',
        avatar: '.profile__image'
    });
    
        
    const popupWithFormProfile = new PopupWithForm('#popup--profile-edit', {
      handleFormSubmit: (data) => {
        return apiAcces.updateUserInfo(data.name, data.about)
                  .then( user => {
                    userInfo.setUserInfo({
                      name: user.name,
                      about: user.about
                    });
                  });
                  //.catch(err => console.error('Error al actualizar el perfil:', err))
      },
      formType: 'profileEdit',
      userInfo,

    });

    const popupWithFormPlace = new PopupWithForm('#popup--place-edit', {
      handleFormSubmit: (data) => {
        return apiAcces.addCard(data.name, data.place)
            .then( newCard => {
              const card = new Card(
                newCard.name,
                newCard.link,
                '#card-template',
                (name, link) => popupWithImage.open(name, link)
              );
              cardList.addItem(card.getView());
            })
        ;
      },
      formType: 'addPlace',
    });
        
    const popupWithFormChangeImgProfile = new PopupWithForm('#popup--change-imgprofile', {
      handleFormSubmit: (data) => {
        return  apiAcces.updateUserAvatar(data.avatar)
            .then(user => {
              userInfo.setUserInfo({ avatar: user.avatar });
            });
        //.catch(err => console.error('Error al actualizar la imagen de perfil:', err));
      },
      formType: 'changeImgProfile',
    });

    /*const popupWithFormCardDelete = new PopupWithForm('#popup--card-delete', {
      handleFormSubmit: () => {
          const cardId = popupWithFormCardDelete.getCardId();
                apiAcces.deleteCard()
                .then(() => {
                  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
                  console.log(cardElement);
                  if (cardElement) {
                      popupWithFormCardDelete.open();
                      cardElement.remove(cardId);
                  }
                  popupWithFormCardDelete.close();
                })
                .catch(err => console.error('Error al eliminar:', err));
         
        },
      formType: 'cardDelete',
      
    });*/
        
    apiAcces.getUserInfo()
      .then( function (user) {
          const userId = user._id;
          userInfo.setUserInfo({
              name: user.name,
              about: user.about,
              avatar: user.avatar,

          });
      })
      .catch((err) => {
          console.log(err);
      });
    apiAcces.getInitialCards()
      .then( function (cardItems) {
        cardList = new Section({
          items: cardItems,
          renderer: (item) => {
            
            const card = new Card(
                item.name,
                item.link, 
                '#card-template',
                (name, link)  => popupWithImage.open(name, link),
                item._id, 
                item.isLiked
                
              );
              
              const cardElement = card.getView();
              cardElement.dataset.cardId = item._id;
              cardList.addItem(cardElement);
                
          }
        }, '.elements');
      
          cardList.renderItems(cardItems);
          
      });

  editProfileButton.addEventListener('click', () => {
    popupWithFormProfile.open();
  });
  addPlaceButton.addEventListener('click', () => {
    popupWithFormPlace.open()
  });

  changeImgProfile.addEventListener('click', () => {
    popupWithFormChangeImgProfile.open();
  });
