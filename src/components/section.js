export default class Section {
    constructor({data, renderer}, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._renderedItems.reverse().forEach((item) => {
            this._renderer(item);
        });
    }
}