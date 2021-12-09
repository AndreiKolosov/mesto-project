const editorPopup = document.querySelector('.popup_type_profile-editor'); // Окно редактирования профиля
const cardAdderPopup = document.querySelector('.popup_type_card_adder'); // Окно добавления карточки
const imagePopup = document.querySelector('.popup_type_img'); // Окно просмотра фотографии
const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const closeBtnInEditor = editorPopup.querySelector('.popup__close-button'); // Кнопка закрытия редактора профиля
const closeBtnInAdder = cardAdderPopup.querySelector('.popup__close-button'); // Кнопка закрытия окна добавления карточки
const closeBtnInImage = imagePopup.querySelector('.popup__close-button'); // Кнопка закрытия окна просмотра фотографии
const userName = document.querySelector('.profile__name'); // Имя пользователя на странице
const userDescription = document.querySelector('.profile__description'); // Описание пользователя на странице
const editorFormElement = document.querySelector('#editor-form'); // Форма редактирования
let nameInput = document.querySelector('#user-name'); // Поле ввода имени
let descriptionInput = document.querySelector('#user-description'); // Поле ввода описания
const adderFormElement = document.querySelector('#adder-form'); // Форма добавления карточки
let placeNameInput = document.querySelector('#place-name'); // Поле ввода имени карточки
let placeLinkInput = document.querySelector('#place-img-link'); // Поле ввода ссылки на фотографию
const galleryContainer = document.querySelector('.galery__list'); // Контейнер карточек
const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки
const photoSizeBig = document.querySelector('.popup__image'); // Фото в модальном окне
const photoCaption = document.querySelector('.popup__img-caption'); // Подпись к фото в модальном окне
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

function formEditorSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(editorPopup);
} // Форма редактирования профиля

function formAdderSubmitHandler(evt) {
  evt.preventDefault();

  galleryContainer.prepend(
    createCard(placeNameInput.value, placeLinkInput.value)
  );

  placeLinkInput.value = '';
  placeNameInput.value = '';

  closePopup(cardAdderPopup);
}

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

  function expendPhoto() {
    openPopup(imagePopup);
    photoSizeBig.src = link;
    photoSizeBig.alt = name;
    photoCaption.textContent = name;
  }

  likeBtn.addEventListener('click', likeCard);
  removeCardBtn.addEventListener('click', removeCard);
  cardImg.addEventListener('click', expendPhoto);

  return createdCard;
}

const newCards = initialCards.map(function (place) {
  return createCard(place.name, place.link);
}); // Перебираю массив
galleryContainer.append(...newCards); // Вставляю карточки

editBtn.addEventListener('click', () => openPopup(editorPopup));
addBtn.addEventListener('click', () => openPopup(cardAdderPopup));
closeBtnInEditor.addEventListener('click', () => closePopup(editorPopup));
closeBtnInAdder.addEventListener('click', () => closePopup(cardAdderPopup));
closeBtnInImage.addEventListener('click', () => closePopup(imagePopup));
editorFormElement.addEventListener('submit', formEditorSubmitHandler);
adderFormElement.addEventListener('submit', formAdderSubmitHandler);
