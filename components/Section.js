
export class Section {
    
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        
    }
    
    setCard (element) {
        this._renderedItems.append(element);
    }
    
    renderItems() {
        this.clear();
        this._renderedItems.forEach(item => {
            this._renderer(item);
            
        });
    }
    
    addItem(element) {
        this._container.prepend(element);
    }
    
    removeItem(element) {
        element.remove(element);
    }
    
    clear() {
        this._container.innerHTML = '';
    }
}