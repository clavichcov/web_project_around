/* Este archivo contiene la clase Card, que se encarga de crear y renderizar las tarjetas de fotos en el contenedor especificado.
   La clase tiene métodos para manejar eventos como el clic en la imagen, el clic en el botón de eliminar y el clic en el botón de me gusta.
   La clase se utiliza en la página principal del proyecto para renderizar las tarjetas de fotos y su titulo.*/

   class Card {
    // El constructor recibe el título, la URL de la imagen y el selector de la tarjeta.
    constructor (title, imageUrl, cardSelector, handleImageClick) {
        this._title = title;
        this._imageUrl = imageUrl;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }
    // El método _getTemplate clona el template de la tarjeta y lo devuelve.
    // Este método se utiliza para crear una nueva tarjeta a partir del template definido en el HTML.
    _getTemplate() {
        return document
        .querySelector('template')
        .content.querySelector('.card__container')
        .cloneNode(true);
        
    }
    // El método _handleLike maneja el clic en el botón de me gusta.
    // Este método se utiliza para cambiar el estado del botón de me gusta cuando se hace clic en él.
    _handleLike() {
        this._likeButton.classList.toggle('card__like-button-active');
    }
    // Este método se utiliza para eliminar la tarjeta del DOM cuando se hace clic en el botón de eliminar.
    _handleDelete() {
        this._element.remove();
    }
    // El método getView devuelve el elemento de la tarjeta con el título y la URL de la imagen.
    // Este método se utiliza para obtener la tarjeta completa con su título y su imagen.
    getView(){
        this._element = this._getTemplate();
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').src = this._imageUrl;
        this._setEventListeners();
        return this._element;
    }
    // El método _setEventListeners agrega los event listeners a los elementos de la tarjeta.
    // Este método se utiliza para manejar los eventos de clic en la tarjeta, como el clic en el botón de me gusta, el clic en el botón de eliminar 
    // y el clic en la imagen de la tarjeta.
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeButton.addEventListener('click', () => this._handleLike());
        this._deleteButton = this._element.querySelector('.card__delete-button');
        this._deleteButton.addEventListener('click', () => this._handleDelete());
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick(this._title, this._imageUrl);
        });
                
    }
}
// Exporta la clase Card por defecto para que pueda ser utilizada en otros archivos.
export {Card};