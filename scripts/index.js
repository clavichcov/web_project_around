document.addEventListener('DOMContentLoaded', () => {
    let buttonEdit = document.querySelector('.profile__edit');
    let buttonAddPlace = document.querySelector('.profile__addPlace');
    let openPopup = document.querySelector('.popup');
    let buttonClose = document.querySelector('.popup__close');
    let closePopup = document.querySelector('.popup');
    
    let inputName = document.querySelector('.form__input_name');
    let inputAbout = document.querySelector('.form__input_about');
    let textTitle = document.querySelector('.profile__title');
    let textText = document.querySelector('.profile__text');
    let textName = textTitle.textContent;
    let textAbout = textText.textContent;
    let buttonSubmit = document.querySelector('.form__submit');
    const loaderTimeout = 5000;

    function openAddProfile() {
        if (openPopup.style.display === 'none' || openPopup.style.display === '') {
            openPopup.style.display = 'flex';
            document.getElementById("form__title_name").textContent="Editar Perfil";
            document.getElementById("form__input_name").placeholder = "Nombre";
            document.getElementById("form__input_extra").placeholder = "Acerca de mí";
            document.getElementById("form__submit").textContent="Guardar";
            document.getElementById("loader").style.display = "block";
            document.getElementById("loader__circle").style.display = "none";
            setTimeout(function() {
                document.getElementById("loader").style.display = "none";
                document.getElementById("loader__circle").style.display = "block";
                inputName.value = textName;
                inputAbout.value = textAbout;
                buttonSubmit.style.backgroundColor = '#000000';
            }, loaderTimeout);
        } else {
            openPopup.style.display = 'none';
        }
    
    
    }

    function openAddPlace(){
        if (openPopup.style.display === 'none' || openPopup.style.display === '') {
            openPopup.style.display = 'flex';
            document.getElementById("form__title_name").textContent="Nuevo lugar";
            document.getElementById("form__input_name").placeholder = "Título";
            document.getElementById("form__input_extra").placeholder = "Enlace a la imagen";
            document.getElementById("form__submit").textContent="Crear";
            
            
        } else {
            openPopup.style.display = 'none';
        }
    }

    function close() {
        if (closePopup.style.display === 'flex'){
            closePopup.style.display = 'none';
            inputName.value = '';
            inputAbout.value = '';
            buttonSubmit.style.backgroundColor = '#FFFFFF';
        } else {
            closePopup.style.display = 'flex';
        }
    
    }

    function like() {
        let button = event.target;
        let currentBackground = window.getComputedStyle(button).backgroundImage;
            if (currentBackground.includes('btn-like-nr.png')) {
                button.style.backgroundImage = 'url("./images/btn-like-ac.png")';
            } else {
                button.style.backgroundImage = 'url("./images/btn-like-nr.png")';
            }
    }

    function handleProfileFormSubmit(evt) {
    
        evt.preventDefault();
        console.log(inputName.value);
        console.log(inputAbout.value);
        textTitle.textContent = inputName.value;
        textText.textContent = inputAbout.value;
        closePopup.style.display = 'none';
        inputName.value = '';
        inputAbout.value = '';
        buttonSubmit.style.backgroundColor = '#FFFFFF'; 
    }

    buttonClose.addEventListener("click" , close);
     
    buttonSubmit.addEventListener('click', handleProfileFormSubmit);
    buttonEdit.addEventListener("click" , openAddProfile);
    buttonAddPlace.addEventListener("click" , openAddPlace);



    const initialCards = [
        { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
        { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
        { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
        { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
        { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
        { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
    ];

    const cardContainer = document.querySelector('.elements');

    initialCards.forEach(cardData => {
        const card = document.createElement('div');
        card.className = 'element';

        const cardRectangle = document.createElement('div');
        cardRectangle.className = 'element__rectangle';

        const cardImage = document.createElement('img');
        cardImage.src = cardData.link;
        cardImage.alt = `Foto de ${cardData.name}`;
        cardImage.className = 'element__image';

        const cardContent = document.createElement('div');
        cardContent.className = 'element__content';

        const cardText = document.createElement('p');
        cardText.className = 'element__text';
        cardText.textContent = cardData.name;

        const cardButton = document.createElement('button');
        cardButton.className = 'element__button';

        const cardTrash = document.createElement('button');
        cardTrash.className = 'element__trash';
        
        const trashIcon = document.createElement('img');
        trashIcon.className = ''
        trashIcon.src = './images/trash.png';
        trashIcon.alt = 'Eliminar';

        cardTrash.appendChild(trashIcon);
        cardContent.appendChild(cardText);
        cardContent.appendChild(cardButton);
        cardRectangle.appendChild(cardImage);
        cardRectangle.appendChild(cardTrash);
        cardRectangle.appendChild(cardContent);
        card.appendChild(cardRectangle);
        cardContainer.appendChild(card);
        cardTrash.addEventListener('click', () => {
            card.remove();
        });
    });
    let buttonsLike = document.querySelectorAll('.element__button');
    buttonsLike.forEach(button => {button.addEventListener('click', like)});
});