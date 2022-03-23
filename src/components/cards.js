// import { expandPhoto, openConfirmPopup } from '../components/modal.js';

export default class Card {
  constructor(
    { likes, link, name, owner, _id },
    cardTemplateSelector,
    handleLikeClick,
    handleDeleteClick,
    likedByMe
  ) {
    this.likes = likes;
    this.link = link;
    this.name = name;
    this.owner = owner;
    this.id = _id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleLikeClick = handleLikeClick;
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

  // _islikedByMe(userId) {
  //   console.log(userId);
  //   return Boolean(this.likes.find((like) => like._id === userId));
  // }

  _setEventListeners(likeBtn, removeBtn, cardImg) {
    likeBtn.addEventListener('click', () => this._handleLikeClick(likeBtn));
  }
}

// const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки

// !!! Попробовать вынести функции науржу
// function addLikeListener(btn) {
//   const card = btn.closest('.card');
//   const likeCounter = card.querySelector('.card__like-counter');

//   btn.addEventListener('click', () => {
//     if (btn.classList.contains('card__like-button_active')) {
//       API.removeLike(card.id)
//         .then((res) => {
//           likeCounter.textContent = res.likes.length;
//           btn.classList.remove('card__like-button_active');
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       API.addLike(card.id)
//         .then((res) => {
//           likeCounter.textContent = res.likes.length;
//           btn.classList.add('card__like-button_active');
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });
// }

// function renderCards(cards, userId, container) {
//   cards.forEach((card) => {
//     const markedCard = createCardElement(card, userId);

//     container.append(markedCard);
//   });
// }

// export { renderCards, createCardElement };
