document.addEventListener('DOMContentLoaded', () => {
    let buttonEdit = document.querySelector('.profile__edit');
    let buttonAddPlace = document.querySelector('.profile__addPlace');
    let popup = document.querySelector('.popup');
    let buttonClose = document.getElementById('popup__close');
    let cardContainer = document.querySelector('.elements');
    let inputName = document.getElementById('form__input_name');
    let inputAbout = document.getElementById('form__input_extra');
    let textTitle = document.querySelector('.profile__title');
    let textText = document.querySelector('.profile__text');
    let buttonSubmit = document.getElementById('form__submit');
    let form = document.getElementById('popupForm');

    const loaderTimeout = 2000; // Tiempo de simulación de carga

    // Función para habilitar o deshabilitar el botón de enviar
    function toggleSubmitButton() {
        if (inputName.value && inputAbout.value) {
            buttonSubmit.disabled = false;
            buttonSubmit.style.backgroundColor = '#000000'; // Cambia el color del botón
        } else {
            buttonSubmit.disabled = true;
            buttonSubmit.style.backgroundColor = '#FFFFFF'; // Restaura el color del botón
        }
    }

    // Escuchar cambios en los campos del formulario
    inputName.addEventListener('input', toggleSubmitButton);
    inputAbout.addEventListener('input', toggleSubmitButton);

    function openPopupWithId(popupId, title, placeholderName, placeholderExtra, submitText, onSubmit) {
        popup.id = popupId;
        popup.style.display = 'flex';
        document.getElementById("form__title_name").textContent = title;
        document.getElementById("form__input_name").placeholder = placeholderName;
        document.getElementById("form__input_extra").placeholder = placeholderExtra;
        document.getElementById("form__submit").textContent = submitText;

        // Reiniciar el estado del botón de enviar
        buttonSubmit.disabled = true;
        buttonSubmit.style.backgroundColor = '#FFFFFF';

        form.removeEventListener('submit', onSubmit);
        form.addEventListener('submit', onSubmit);
    }

    function openAddProfile() {
        openPopupWithId(
            'editProfilePopup',
            "Editar Perfil",
            "Nombre",
            "Acerca de mí",
            "Guardar",
            handleProfileFormSubmit
        );

        // Simulación de carga con setTimeout
        setTimeout(() => {
            inputName.value = textTitle.textContent;
            inputAbout.value = textText.textContent;
            toggleSubmitButton(); // Habilitar el botón si los campos están llenos
        }, loaderTimeout);
    }

    function openAddPlace() {
        openPopupWithId(
            'addPlacePopup',
            "Nuevo lugar",
            "Título",
            "Enlace a la imagen",
            "Crear",
            addPlace
        );
    }

    function handleProfileFormSubmit(evt) {
        evt.preventDefault();
        textTitle.textContent = inputName.value;
        textText.textContent = inputAbout.value;
        closePopup();
    }

    function addPlace(evt) {
        evt.preventDefault();
        const cardData = {
            name: document.getElementById("form__input_name").value,
            link: document.getElementById("form__input_extra").value
        };

        const card = createCard(cardData);
        cardContainer.prepend(card); // Agrega la tarjeta al principio
        closePopup();
        form.reset();
    }

    function closePopup() {
        popup.style.display = 'none';
        inputName.value = '';
        inputAbout.value = '';
        buttonSubmit.style.backgroundColor = '#FFFFFF';
    }

    function createCard(cardData) {
        const card = document.createElement('div');
        card.className = 'element';

        const cardRectangle = document.createElement('div');
        cardRectangle.className = 'element__rectangle';

        const cardImage = document.createElement('img');
        cardImage.src = cardData.link;
        cardImage.alt = `Foto de ${cardData.name}`;
        cardImage.className = 'element__image';

        // Verifica si la imagen se carga correctamente
        cardImage.onerror = () => {
            console.error("Error al cargar la imagen:", cardData.link);
            cardImage.src = "./images/error400.jpg"; // Imagen de respaldo
        };

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
        trashIcon.src = 'images/Trash.png';
        trashIcon.alt = 'Eliminar';

        cardTrash.appendChild(trashIcon);
        cardContent.appendChild(cardText);
        cardContent.appendChild(cardButton);
        cardRectangle.appendChild(cardImage);
        cardRectangle.appendChild(cardTrash);
        cardRectangle.appendChild(cardContent);
        card.appendChild(cardRectangle);

        cardTrash.addEventListener('click', () => {
            card.remove();
        });

        cardImage.addEventListener('click', imgAction);

        cardButton.addEventListener('click', like);

        return card;
    }

    function like(event) {
        let button = event.target;
        let currentBackground = window.getComputedStyle(button).backgroundImage;
        if (currentBackground.includes('btn-like-nr.png')) {
            button.style.backgroundImage = 'url("./images/btn-like-ac.png")';
        } else {
            button.style.backgroundImage = 'url("./images/btn-like-nr.png")';
        }
    }

    const modal = document.createElement('section');
    modal.setAttribute('id', 'modal');
    modal.setAttribute('class', 'modal');

    const container = document.createElement('div');
    container.setAttribute('id' , 'modal__content');
    container.setAttribute('class' , 'modal__content');

    const closeImg = document.createElement('button');
    closeImg.setAttribute('class', 'close');
    
    const modalImg = document.createElement('img');
    modalImg.setAttribute('class', 'image__modal-content');
    modalImg.setAttribute('id', 'img01');

    modal.appendChild(container);
    container.appendChild(modalImg);
    container.appendChild(closeImg);
    
    document.body.appendChild(modal);

    function imgAction(event) {
        modal.style.display = 'flex';
        modalImg.src = event.target.src;
    }

    closeImg.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    buttonClose.addEventListener("click", closePopup);
    buttonEdit.addEventListener("click", openAddProfile);
    buttonAddPlace.addEventListener("click", openAddPlace);

    const initialCards = [
        { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
        { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
        { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
        { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
        { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
        { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
    ];

    initialCards.forEach(cardData => {
        const card = createCard(cardData);
        cardContainer.prepend(card); 
    });
});