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
const editorForm = document.querySelector('#editor-form'); // Форма редактирования
const nameInput = document.querySelector('#user-name'); // Поле ввода имени
const descriptionInput = document.querySelector('#user-description'); // Поле ввода описания
const cardsForm = document.querySelector('#adder-form'); // Форма добавления карточки
const placeNameInput = document.querySelector('#place-name'); // Поле ввода имени карточки
const placeLinkInput = document.querySelector('#place-img-link'); // Поле ввода ссылки на фотографию
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
  popup.classList.add('popup_opened'); // Добавляет класс
  document.addEventListener('keydown', pressEsc);
  document.addEventListener('click', overlayClick);
} // Функция открытия модально окна принимающая на вход переменную нужного модального окна

function closePopup(popup) {
  popup.classList.remove('popup_opened'); // Убирает класс
  document.removeEventListener('keydown', pressEsc);
  document.removeEventListener('click', overlayClick);
} // Функция закрытия модального окна

function pressEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

function overlayClick(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup')) {
    closePopup(activePopup);
  }
}

function submitEditorForm(evt) {
  // evt.preventDefault();
  userName.textContent = nameInput.value; // Значение value поля ввода === текстовому содержимому тега на странице
  userDescription.textContent = descriptionInput.value; // Аналогично верхнему
  closePopup(editorPopup);
} // Форма редактирования профиля

function submitAdderForm(evt) {
  // evt.preventDefault();

  galleryContainer.prepend(createCard(placeNameInput.value, placeLinkInput.value)); // Отправляю value импутов в качестве параметров фунции, создаю карточку, кладу в начало списка

  // Делаю импуты пустыми после закрытия
  cardsForm.reset();

  closePopup(cardAdderPopup);
}

function createCard(name, link) {
  const createdCard = cardTemplate.querySelector('.card').cloneNode(true); // Карточка, склонированная из шаблона
  const removeCardBtn = createdCard.querySelector('.card__trash-button'); // Кнопка удаления карточки
  const likeBtn = createdCard.querySelector('.card__like-button'); // Кнопка лайк
  const cardName = createdCard.querySelector('.card__name'); // Элемент с названием карточки
  const cardImg = createdCard.querySelector('.card__image'); // Элемент Img в карточке

  cardName.textContent = name; // Текстовое содержимое тега === параметру name
  cardImg.src = link; // Атрибут src у img становится === параметру link
  cardImg.alt = name; // Атрибут alt у img становится === параметру name

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
  } // Развернуть окно просмотра карточки

  likeBtn.addEventListener('click', likeCard); // Отслеживаю клик по сердечку
  removeCardBtn.addEventListener('click', removeCard); // Отслеживаю клик по корзине
  cardImg.addEventListener('click', expendPhoto); // Отслеживаю клик по картинке

  return createdCard; // Возвращаю созданную карточку
}

const newCards = initialCards.map(function (place) {
  return createCard(place.name, place.link); // На каждой итерации из массива берется объект и его ключи отправляются в функцию создания карточки и кладу в новый массив
}); // Перебираю массив
galleryContainer.append(...newCards); // Вставляю карточки спредом

editBtn.addEventListener('click', () => openPopup(editorPopup)); // Отслеживаю клик по кнопке редактирования
addBtn.addEventListener('click', () => openPopup(cardAdderPopup)); // Отслеживаю клик по кнопки добавления
closeBtnInEditor.addEventListener('click', () => closePopup(editorPopup)); // Клик по кнопки закрытия
closeBtnInAdder.addEventListener('click', () => closePopup(cardAdderPopup)); // Клик по кнопки закрытия
closeBtnInImage.addEventListener('click', () => closePopup(imagePopup)); // Клик по кнопки закрытия
editorForm.addEventListener('submit', submitEditorForm); // Сабмит формы редактирования
cardsForm.addEventListener('submit', submitAdderForm); // Сабмит формы добавления
