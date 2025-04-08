const form = document.querySelector('.form');
const popup = document.querySelector('.popup');
const inputName = document.getElementById('form_input_name');
const inputExtra = document.querySelector('.form__input_extra');
const buttonSubmit = form.querySelector(".form__submit");

const handleEditProfileClick = () => {
    const popup = document.querySelector('.popup');
    const extraInput = document.querySelector('.form__input_extra');
    const buttonElement = form.querySelector(".form__submit");
    document.getElementById('form_title_name').textContent = 'Editar perfil';
    document.getElementById('form_input_name').placeholder = 'Nombre';
    document.getElementById("form_submit").textContent = 'Guardar';
    extraInput.placeholder = 'Acerca de mí';
    extraInput.type = 'text';    
    popup.classList.add('popup_opened');
}
const handleAddPlaceClick = () => {
    const popup = document.querySelector('.popup');
    const extraInput = document.querySelector('.form__input_extra');
    const buttonElement = form.querySelector(".form__submit");
    document.getElementById('form_input_name').placeholder = 'Título';
    document.getElementById("form_submit").textContent = 'Crear';
    extraInput.placeholder = 'Enlace a la imagen';
    extraInput.type = 'url'; 
    popup.classList.add('popup_opened');
}
function closePopup() {
        form.reset();
        popup.style.display = 'none';
        inputName.value = '';
        inputExtra.value = '';        
        buttonSubmit.style.backgroundColor = '#FFFFFF';
        
        /*clearSpan(form, inputName);
        clearSpan(form, inputExtra);
        document.removeEventListener('keydown', handleEscapeKey);*/
    }
export { handleEditProfileClick, handleAddPlaceClick, closePopup as clickClose };