let buttonEdit = document.querySelector('.profile__button_edit');
let openPopup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close');
let closePopup = document.querySelector('.popup');
function open() {
    if (openPopup.style.display === 'none' || openPopup.style.display === '') {
        openPopup.style.display = 'flex';
    } else {
        openPopup.style.display = 'none';
    }
    
}
function close() {
    if (closePopup.style.display === 'flex'){
        closePopup.style.display = 'none';
    } else {
        closePopup.style.display = 'flex';
    }
    
}
buttonEdit.addEventListener("click" , open);
buttonClose.addEventListener("click" , close);