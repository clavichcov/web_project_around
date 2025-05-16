import {apiAcces} from '../components/Api.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/Userinfo.js';
import { editProfileButton, addPlaceButton, changeImgProfile } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForms.js';

import  PopupWithImage  from '../components/PopupWithImage.js';


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
                  
      },
      formType: 'profileEdit',
      userInfo,

    });

    
        
    const popupWithFormChangeImgProfile = new PopupWithForm('#popup--change-imgprofile', {
      handleFormSubmit: (data) => {
        return  apiAcces.updateUserAvatar(data.avatar)
            .then(user => {
              userInfo.setUserInfo({ avatar: user.avatar });
            });
        
      },
      formType: 'changeImgProfile',
    });

    const popupWithImage = new PopupWithImage('#popup-image');
    handleFormSubmit: (data) => {
      userInfo({
        name: user.name,
        about: user.about
      });
    }
   
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
        const cardList = new Section({
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
            cardList
          });
          addPlaceButton.addEventListener('click', () => {
            popupWithFormPlace.open()
          });
      });

  editProfileButton.addEventListener('click', () => {
    popupWithFormProfile.open();
  });
  

  changeImgProfile.addEventListener('click', () => {
    popupWithFormChangeImgProfile.open();
  });
