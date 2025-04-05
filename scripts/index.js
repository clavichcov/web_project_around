
import { enableValidation, clearSpan, toggleButtonState } from './validate.js';
document.addEventListener('DOMContentLoaded', () => {
  enableValidation();
  
});
document.addEventListener('DOMContentLoaded', () => {
    let buttonEdit = document.querySelector('.profile__edit');
    let buttonAddPlace = document.querySelector('.profile__addPlace');
    let popup = document.querySelector('.popup');
    let buttonClose = document.getElementById('popup_close');
    let cardContainer = document.querySelector('.elements');
    let inputName = document.getElementById('form_input_name');
    let inputExtra = document.getElementById('form_input_extra');
    let textTitle = document.querySelector('.profile__title');
    let textText = document.querySelector('.profile__text');
    let buttonSubmit = document.getElementById('form_submit');
    let form = document.getElementById('form_popup');
    // Tiempo de simulación de carga
    const loaderTimeout = 2000; 

    
    // Función para abrir el popup con un ID específico y configurar los campos
    function openPopupWithId(popupId, title, placeholderName, placeholderExtra, submitText, onSubmit) {
        popup.id = popupId;
        popup.style.display = 'flex';
        document.getElementById("form_title_name").textContent = title;
        document.getElementById("form_input_name").placeholder = placeholderName;
        document.getElementById("form_input_extra").placeholder = placeholderExtra;
        document.getElementById("form_submit").textContent = submitText;
        const inputList = Array.from(form.querySelectorAll(".form__input"));
        const buttonElement = form.querySelector(".form__submit");
        toggleButtonState(inputList, buttonElement);
        form.removeEventListener('submit', onSubmit);
        form.addEventListener('submit', onSubmit);
    }

    /* Función para abrir el popup de edición de perfil
       y simular la carga de datos*/
    function openAddProfile() {
        openPopupWithId(
            'editProfilePopup',
            "Editar Perfil",
            "Nombre",
            "Acerca de mí",
            "Guardar",
            handleProfileFormSubmit
        );
        //Configurar input__name con un minimo y maximo de caracteres permitidos
        const inputName = document.getElementById("form_input_name");
        inputName.minLength = 2;  
        inputName.maxLength = 40;
        //Configurar input__extra como campo de texto y asignar minimo y maximo de caracteres permitidos
        
        const inputExtra = document.getElementById("form_input_extra");
        inputExtra.type = "text";
        inputExtra.minLength = 2;  
        inputExtra.maxLength = 200;
        if(inputExtra.classList.contains("form__input_url")){
            inputExtra.classList.remove("form__input_url");
            inputExtra.removeAttribute('pattern');
            inputExtra.removeAttribute('title');
            inputExtra.type = 'text';
        }
        inputExtra.classList.add("form__input_text")
        // Simulación de carga con setTimeout
        setTimeout(() => {
            inputName.value = textTitle.textContent;
            inputExtra.value = textText.textContent;
            const inputList = [inputName, inputExtra];
            const buttonElement = form.querySelector(".form__submit");
            toggleButtonState(inputList, buttonElement);
            
        }, loaderTimeout);
    }

    // Función para abrir el popup de nuevo lugar
    function openAddPlace() {
        openPopupWithId(
            'addPlacePopup',
            "Nuevo lugar",
            "Título",
            "Enlace a la imagen",
            "Crear",
            addPlace
        );
        //Configurar input__name con un minimo y maximo de caracteres permitidos
        const inputName = document.getElementById("form_input_name");
        inputName.minLength = 2;  
        inputName.maxLength = 40;
        // Configurar como campo como url
        const urlInput = document.getElementById("form_input_extra");
        if(inputExtra.classList.contains("form__input_text")){
            inputExtra.classList.remove("form__input_text");
        }
        inputExtra.classList.add("form__input_url");
        urlInput.type = "url";
        urlInput.pattern = "https://.*";  
        urlInput.title = "Por favor ingresa una URL válida (debe comenzar con https://)";
        
    }

    // Función para manejar el envío del formulario de perfil
    // y actualizar el texto del perfil
    // y cerrar el popup
    function handleProfileFormSubmit(evt) {
        evt.preventDefault();
        textTitle.textContent = inputName.value;
        textText.textContent = inputExtra.value;
        closePopup();
    }

    // Función para manejar el envío del formulario de nuevo lugar
    // y crear una nueva tarjeta
    // y cerrar el popup
    function addPlace(evt) {
        evt.preventDefault();
        if(inputExtra.classList.contains("form__input_url")){
            const cardData = {
                name: document.getElementById("form_input_name").value,
                link: document.querySelector(".form__input_url").value
            };
            const card = createCard(cardData);
            cardContainer.prepend(card); 
            closePopup();
        }
        
    }

    // Función para cerrar el popup y limpiar los campos
    // y restaurar el color del botón de enviar
    function closePopup() {
        form.reset();
        popup.style.display = 'none';
        inputName.value = '';
        inputExtra.value = '';        
        buttonSubmit.style.backgroundColor = '#FFFFFF';
                
        /*if(inputExtra.classList.contains("form__input_url")){
            inputExtra.classList.remove("form__input_url");
            inputExtra.removeAttribute('pattern');
            inputExtra.removeAttribute('title');
            inputExtra.type = 'text';
        }*/
        /*if(inputExtra.classList.contains("form__input_text")){
            inputExtra.classList.remove("form__input_text");
        }*/
        
        clearSpan(form, inputName);
        clearSpan(form, inputExtra);
    }

    // Función para crear una tarjeta
    // y agregarle eventos de clic para eliminar y mostrar la imagen
    // y mostrar la imagen en un modal
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
    // Función para cambiar el estado del botón de "me gusta"
    // y cambiar la imagen del botón
    // y simular la carga de datos
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
    // Agregar el evento de clic al botón de cerrar
    // y simular la carga de datos
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

    buttonClose.addEventListener("click", closePopup);
    buttonEdit.addEventListener("click", openAddProfile);
    buttonAddPlace.addEventListener("click", openAddPlace);
});

