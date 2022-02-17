import { expendPhoto } from '../components/modal.js';

const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]; // Массив карточек "из коробки"

function removeCard(event) {
  event.target.closest('.card').remove();
} // Удаление карточки

function likeCard() {
  this.classList.toggle('card__like-button_active');
} // Лайк

function createCard(name, link) {
  const createdCard = cardTemplate.querySelector('.card').cloneNode(true); // Карточка, склонированная из шаблона
  const removeCardBtn = createdCard.querySelector('.card__trash-button'); // Кнопка удаления карточки
  const likeBtn = createdCard.querySelector('.card__like-button'); // Кнопка лайк
  const cardName = createdCard.querySelector('.card__name'); // Элемент с названием карточки
  const cardImg = createdCard.querySelector('.card__image'); // Элемент Img в карточке

  cardName.textContent = name; // Текстовое содержимое тега === параметру name
  cardImg.src = link; // Атрибут src у img становится === параметру link
  cardImg.alt = name; // Атрибут alt у img становится === параметру name

  likeBtn.addEventListener('click', likeCard); // Отслеживаю клик по сердечку
  removeCardBtn.addEventListener('click', removeCard); // Отслеживаю клик по корзине
  cardImg.addEventListener('click', expendPhoto); // Отслеживаю клик по картинке

  return createdCard; // Возвращаю созданную карточку
}

const newCards = initialCards.map(function (place) {
  return createCard(place.name, place.link); // На каждой итерации из массива берется объект и его ключи отправляются в функцию создания карточки и кладу в новый массив
}); // Перебираю массив

export { newCards };
