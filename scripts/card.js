class Card {
    constructor (title, imageUrl, cardSelector) {
        this._title = title;
        this._imageUrl = imageUrl;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.element')
        .cloneNode(true);
        return cardElement;
    }
    getView(){
        this.element = this._getTemplate();
        this.element.querySelector('.element__text').textContent = this._title;
        this.element.querySelector('.element__image').src = this._imageUrl;
        return this.element;
    }

}
export {Card};