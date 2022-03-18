import { expandPhoto, openConfirmPopup } from '../components/modal.js';

export default class Card {
  constructor({ likes, link, name, owner, _id }, cardTemplateSelector, { setLike }) {
    this.likes = likes;
    this.link = link;
    this.name = name;
    this.owner = owner;
    this.id = _id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._setLike = setLike;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  createCardElement(userId) {
    // const cardMarkup = cardTemplate.querySelector('.card').cloneNode(true);
    this._element = this._getElement();
    const likeBtn = this._element.querySelector('.card__like-button');
    const cardName = this._element.querySelector('.card__name');
    const cardImg = this._element.querySelector('.card__image');
    const likeCounter = this._element.querySelector('.card__like-counter');
    const removeBtn = this._element.querySelector('.card__remove-button');
    // const likes = card.likes;

    likeCounter.textContent = 0;

    if (userId !== this.owner._id) {
      removeBtn.classList.add('card__remove-button_invisible');
    }

    if (this.likes.length > 0) {
      likeCounter.classList.add('card__like-counter_visible');
      likeCounter.textContent = this.likes.length;
      if (this._islikedByMe()) {
        likeBtn.classList.add('card__like-button_active');
      }
    }

    this._element.id = this._id;
    cardName.textContent = this.name;
    cardImg.src = this.link;
    cardImg.alt = this.name;

    addLikeListener(likeBtn);
    cardImg.addEventListener('click', expandPhoto);
    removeBtn.addEventListener('click', () => openConfirmPopup(card._id));
    return cardMarkup;
  }

  _renderLike(likeBtn) {
    likeBtn.classList.toggle('card__like-button_active');
  }

  _renderLikeCount(card) {
    this.likes = card.likes;
    likeCounter.textContent = this.likes.length;
  }

  _selectLikeAction(likedByMe) {
    if (likedByMe) {
      return 'DELETE';
    } else {
      return 'PUT';
    }
  }

  _islikedByMe() {
    return Boolean(this.likes.find((like) => like._id === userId));
  }

  _handleLikeClick() {
    const action = this._selectLikeAction(this._islikedByMe());
    this._setLike(this.id, action).then((card) => {
      this._renderLikeCount(card);
    });
  }

  // _setEventListeners() {
  //   likeBtn.addEventListener('click', () => )
  // }
}

// const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки

// !!! Попробовать вынести функции науржу
function addLikeListener(btn) {
  const card = btn.closest('.card');
  const likeCounter = card.querySelector('.card__like-counter');

  btn.addEventListener('click', () => {
    if (btn.classList.contains('card__like-button_active')) {
      API.removeLike(card.id)
        .then((res) => {
          likeCounter.textContent = res.likes.length;
          btn.classList.remove('card__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      API.addLike(card.id)
        .then((res) => {
          likeCounter.textContent = res.likes.length;
          btn.classList.add('card__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

function renderCards(cards, userId, container) {
  cards.forEach((card) => {
    const markedCard = createCardElement(card, userId);

    container.append(markedCard);
  });
}

// export { renderCards, createCardElement };
