const editorPopup = document.querySelector('.popup_type_profile-editor'); // Окно редактирования профиля
const cardAdderPopup = document.querySelector('.popup_type_card_adder'); // Окно добавления карточки
const imagePopup = document.querySelector('.popup_type_img'); // Окно просмотра фотографии
const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const closeBtnInEditor = editorPopup.querySelector('.popup__close-button'); // Кнопка закрытия редактора профиля
const closeBtnInCardAdder = cardAdderPopup.querySelector(
  '.popup__close-button'
); // Кнопка закрытия окна добавления карточки
const closeBtnImgPopup = imagePopup.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__name'); // Имя пользователя на странице
const userDescription = document.querySelector('.profile__description'); // Описание пользователя на странице
let nameInput = document.querySelector('#user-name'); // Поле ввода формы редактирования
let descriptionInput = document.querySelector('#user-description'); // Поле ввода формы редактирования
const formElement = document.querySelector('.form'); // Форма редактирования
const galleryContainer = document.querySelector('.galery__list'); // Контейнер карточек
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
} // Функция открытия модально окна принимающая на вход переменную нужного модального окна

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

nameInput.value = userName.textContent;
descriptionInput.value = userDescription.textContent;

function formEditorSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(editorPopup);
} // Форма редактирования профиля

function createCard(name, link) {
  const createdCard = cardTemplate.querySelector('.card').cloneNode(true); // Карточка, склонированная из шаблона
  const removeCardBtn = createdCard.querySelector('.card__trash-button'); // Кнопка удаления карточки
  const likeBtn = createdCard.querySelector('.card__like-button');
  const cardName = createdCard.querySelector('.card__name');
  const cardImg = createdCard.querySelector('.card__image');

  cardName.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;

  function likeCard() {
    likeBtn.classList.toggle('card__like-button_active');
  } // Лайк

  function removeCard(event) {
    event.target.closest('.card').remove();
  } // Удаление карточки

  likeBtn.addEventListener('click', likeCard);
  removeCardBtn.addEventListener('click', removeCard);

  return createdCard;
}

const newCards = initialCards.map(function (place) {
  return createCard(place.name, place.link);
}); // Перебираю массив
galleryContainer.append(...newCards); // Вставляю карточки

editBtn.addEventListener('click', () => openPopup(editorPopup));
addBtn.addEventListener('click', () => openPopup(cardAdderPopup));
closeBtnInEditor.addEventListener('click', () => closePopup(editorPopup));
closeBtnInCardAdder.addEventListener('click', () => closePopup(cardAdderPopup));
formElement.addEventListener('submit', formEditorSubmitHandler);
