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
    this._id = _id;
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
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._cardName = this._element.querySelector('.card__name');
    this._cardImg = this._element.querySelector('.card__image');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._removeBtn = this._element.querySelector('.card__remove-button');

    this._likeCounter.textContent = 0;
    this._renderLikeCount(this);

    if (userId !== this.owner._id) {
      this._removeBtn.classList.add('card__remove-button_invisible');
    }

    if (this._isLikedByMe) {
      this._renderLike(this._likeBtn);
    }

    this._element.id = this._id;
    this._cardName.textContent = this.name;
    this._cardImg.src = this.link;
    this._cardImg.alt = this.name;

    this._setEventListeners();

    return this._element;
  }

  _renderLike() {
    this._likeBtn.classList.toggle('card__like-button_active');
  }

  _renderLikeCount(card) {
    this.likes = card.likes;
    // const likeCounter = this._element.querySelector('.card__like-counter');
    this._likeCounter.textContent = this.likes.length;
  }

  selectLikeAction() {
    if (this._isLikedByMe) {
      return 'DELETE';
    } else {
      return 'PUT';
    }
  }

  getId() {
    return this._id;
  }

  _setEventListeners() {
    const card = this;
    this._likeBtn.addEventListener('click', () => this._handleLikeClick(this));
    this._removeBtn.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
    this._cardImg.addEventListener('click', () => {
      this._handleOpenImage(card);
    });
  }

  _removeCard() {
    this._element.remove();
  }
}
