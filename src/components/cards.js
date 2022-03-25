export default class Card {
  constructor(
    { likes, link, name, owner, _id },
    cardTemplateSelector,
    handleLikeClick,
    handleDeleteClick,
    handleOpenImage,
    likedByMe
  ) {
    this.likes = likes;
    this.link = link;
    this.name = name;
    this.owner = owner;
    this.id = _id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleOpenImage = handleOpenImage;
    this._isLikedByMe = likedByMe;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  createCardElement(userId) {
    this._element = this._getElement();
    const likeBtn = this._element.querySelector('.card__like-button');
    const cardName = this._element.querySelector('.card__name');
    const cardImg = this._element.querySelector('.card__image');
    const likeCounter = this._element.querySelector('.card__like-counter');
    const removeBtn = this._element.querySelector('.card__remove-button');

    likeCounter.textContent = 0;
    this._renderLikeCount(this);

    if (userId !== this.owner._id) {
      removeBtn.classList.add('card__remove-button_invisible');
    }

    if (this._isLikedByMe) {
      this._renderLike(likeBtn);
    }

    this._element.id = this._id; //УБРАТЬ ПРИСВАИВАНИЕ ID ЭЛЕМЕНТУ, Т.К. ОН УЖЕ ЕСТЬ В ЭКЗЕМПЛЯРЕ КЛАССА CARD
    cardName.textContent = this.name;
    cardImg.src = this.link;
    cardImg.alt = this.name;

    this._setEventListeners(likeBtn, removeBtn, cardImg);
    // addLikeListener(likeBtn);
    //cardImg.addEventListener('click', expandPhoto);
    //removeBtn.addEventListener('click', () => openConfirmPopup(card._id));
    return this._element;
  }

  _renderLike(likeBtn) {
    likeBtn.classList.toggle('card__like-button_active');
  }

  _renderLikeCount(card) {
    this.likes = card.likes;
    const likeCounter = this._element.querySelector('.card__like-counter');
    likeCounter.textContent = this.likes.length;
  }

  _selectLikeAction() {
    if (this._isLikedByMe) {
      return 'DELETE';
    } else {
      return 'PUT';
    }
  }

  _setEventListeners(likeBtn, removeBtn, cardImg) {
    const card = this;
    likeBtn.addEventListener('click', () => this._handleLikeClick(likeBtn));
    removeBtn.addEventListener('click', () => {
      this._handleDeleteClick(card);
    });
    cardImg.addEventListener('click', () => {
      this._handleOpenImage(card);
    });
  }

  _removeCard() {
    this._element.remove();
  }
}