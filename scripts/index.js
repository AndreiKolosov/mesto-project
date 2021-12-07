// Находим popup редактирования профиля**************************************************************************************************
const editProfilePopup = document.querySelector('.popup_type_profile-editor');
// Создаем функцию-обработчик, добавляющую класс для popup
function openEditorPopup() {
  editProfilePopup.classList.add('popup_opened');
}
// Убирающую класс
function closeEditorPopup() {
  editProfilePopup.classList.remove('popup_opened');
  cardAdderPopup.classList.remove('popup_opened');
}

// Находим кнопку открытия окна редактирования профиля и объявляем переменную
const profileEditBtn = document.querySelector('.profile__edit-button');
// Вешаем слушатель clik на кнопку редактирования
profileEditBtn.addEventListener('click', openEditorPopup);

// Находим кнопку закрытия окна редактирования профиля и объявляем переменную
const closePopupBtn = document.querySelector('.popup__close-button');
// Прикрепляем слушатель
closePopupBtn.addEventListener('click', closeEditorPopup);

// Popup добавления карточки
const cardAdderPopup = document.querySelector('.popup_type_card_adder');

function openAdderPopup() {
  cardAdderPopup.classList.add('popup_opened');
}

function closeAdderPopup() {
  cardAdderPopup.classList.remove('popup_opened');
}

const addCardBtn = document.querySelector('.profile__add-button');
addCardBtn.addEventListener('click', openAdderPopup);

// Реализую редактирование профиля *************************************************************************************
//  Выбираю элементы имени и описания на странице
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
// Поля ввода
let nameInput = document.querySelector('#user-name');
let descriptionInput = document.querySelector('#user-description');
// Выбираю форму
const formElement = document.querySelector('.form');
//  Кнопка сохранить
const saveEdits = document.querySelector('.form__save-button');

nameInput.value = userName.textContent;
descriptionInput.value = userDescription.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

// Добавление карточки****************************************************************************************************
const galleryContainer = document.querySelector('.gallery__list'); // Контейнер карточек
const cardTemplate = document.querySelector('#card-template'); // шаблон карточки
// Массив для карточек "из коробки"
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
];

function addCard(place) {
  const cardElement = document.querySelector('.card').cloneNode(true); // карточка полученная из шаблона
  const removeCardBtn = cardElement.querySelector('.card__trash-button'); // кнопкаудаления карточки
  const likeCardBtn = cardElement.querySelector('.card__like-button'); // кнопка лайк

  function likeCard() {
    likeCardBtn.classList.toggle('card__like-button_active');
  }

  likeCardBtn.addEventListener('click', likeCard);
  removeCardBtn.addEventListener('click', removeCard);

  cardElement.querySelector('.card__name').textContent = place.name;
  cardElement.querySelector('.card__image').alt = plase.name;
  cardElement.querySelector('.card__image').src = place.link;

  return cardElement;
}

function removeCard(event) {
  event.target.closest('.card').remove();
}
