import { expendPhoto, openConfirmPopup } from '../components/modal.js';
import API from './api.js';

const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки

// function removeCard() {
//   API.deleteCard(card.id)
//     .then((res) => {
//       agreeBtn.removeEventListener('click', handler);
//       card.remove();
//       closePopup(confirmPopup);
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

// !!! Попробовать вынести функции науржу
function addLikeListener(btn) {
  const card = btn.closest('.card');
  const likeCounter = card.querySelector('.card__like-counter');

  btn.addEventListener('click', () => {
    if (btn.classList.contains('card__like-button_active')) {
      API.removeLike(card.id)
        .then((res) => {
          likeCounter.textContent = res.likes.length;
          likeCounter.classList.remove('card__like-counter_visible');
          btn.classList.remove('card__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      API.addLike(card.id)
        .then((res) => {
          likeCounter.textContent = res.likes.length;
          likeCounter.classList.add('card__like-counter_visible');
          btn.classList.add('card__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

// нужен user id
function createCardElement(card, userId) {
  const cardMarkup = cardTemplate.querySelector('.card').cloneNode(true);
  const likeBtn = cardMarkup.querySelector('.card__like-button'); // Кнопка лайк
  const cardName = cardMarkup.querySelector('.card__name'); // Элемент с названием карточки
  const cardImg = cardMarkup.querySelector('.card__image'); // Элемент Img в карточке
  const likeCounter = cardMarkup.querySelector('.card__like-counter');
  const removeBtn = cardMarkup.querySelector('.card__trash-button');
  const likes = card.likes;
  const likedByMe = Boolean(likes.find((like) => like._id === userId));

  if (userId !== card.owner._id) {
    // removeBtn.style.display = 'none';
    removeBtn.remove();
  }

  if (card.likes.length > 0) {
    likeCounter.classList.add('card__like-counter_visible');
    likeCounter.textContent = card.likes.length;
    if (likedByMe) {
      likeBtn.classList.add('card__like-button_active');
    }
  }

  cardMarkup.id = card._id;
  cardName.textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.name;

  addLikeListener(likeBtn);
  cardImg.addEventListener('click', expendPhoto);
  removeBtn.addEventListener('click', openConfirmPopup);
  return cardMarkup;
}

function renderCards(cards, userId, container) {
  cards.forEach((card) => {
    const markedCard = createCardElement(card, userId);

    container.append(markedCard);
  });
}

export { renderCards, createCardElement };
