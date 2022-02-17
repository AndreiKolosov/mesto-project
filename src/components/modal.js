import { openPopup } from '../components/utils.js';

const photoSizeBig = document.querySelector('.popup__image'); // Фото в модальном окне
const photoCaption = document.querySelector('.popup__img-caption'); // Подпись к фото в модальном окне
const imagePopup = document.querySelector('.popup_type_img'); // Окно просмотра фотографии
const cardAdderPopup = document.querySelector('.popup_type_card_adder'); // Окно добавления карточки
const editorPopup = document.querySelector('.popup_type_profile-editor'); // Окно редактирования профиля
const userName = document.querySelector('.profile__name'); // Имя пользователя на странице
const userDescription = document.querySelector('.profile__description'); // Описание пользователя на странице
const nameInput = document.querySelector('#user-name'); // Поле ввода имени
const descriptionInput = document.querySelector('#user-description'); // Поле ввода описания
const placeNameInput = document.querySelector('#place-name'); // Поле ввода имени карточки
const placeLinkInput = document.querySelector('#place-img-link'); // Поле ввода ссылки на фотографию

function openProfileEditor() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(editorPopup);
}

function openCardCreator() {
  openPopup(cardAdderPopup);
}

function expendPhoto(evt) {
  const image = evt.target.closest('.card__image'); // Элемент Img в карточке
  openPopup(imagePopup);
  photoSizeBig.src = image.src;
  photoSizeBig.alt = image.alt;
  photoCaption.textContent = image.alt;
} // Развернуть окно просмотра карточки

export { userName, nameInput, userDescription, descriptionInput, placeNameInput, placeLinkInput }; // переменные
export { expendPhoto, openProfileEditor, openCardCreator, editorPopup, cardAdderPopup }; // функции
