export default class Section {
    constructor({data, createItem}, containerSelector) {
        this.renderedItems = data;
        this.createItem = createItem;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems(user) {
        this.renderedItems.reverse().forEach((item) => {
            this.addItem(this.createItem(item, user));
        });
    }
}
