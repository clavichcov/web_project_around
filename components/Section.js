/* Este archivo contiene la clase Section, que se encarga de renderizar los elementos en el contenedor especificado.
   La clase tiene métodos para agregar, eliminar y limpiar elementos en el contenedor. También tiene un método 
   para renderizar los elementos iniciales en el contenedor. La clase se utiliza en la página principal del proyecto 
   para renderizar las tarjetas de fotos y la información del usuario.*/
export class Section {
    // El constructor recibe un objeto con los elementos a renderizar y una función de renderizado, así como el selector del contenedor.
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        
    }
    /// El método setCard agrega un elemento al contenedor.
    setCard (element) {
        this._renderedItems.append(element);
    }
    // El método renderItems recorre los elementos y llama a la función de renderizado para cada uno.
    // Luego, limpia el contenedor y renderiza los elementos.
    renderItems() {
        this.clear();
        this._renderedItems.forEach(item => {
            this._renderer(item);
            
        });
    }
    // El método addItem agrega un elemento al principio del contenedor.
    addItem(element) {
        this._container.prepend(element);
    }
    // El método removeItem elimina un elemento del contenedor.
    removeItem(element) {
        element.remove(element);
    }
    // El método clear limpia el contenedor eliminando todos los elementos.
    clear() {
        this._container.innerHTML = '';
    }
}