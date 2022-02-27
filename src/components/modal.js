import { openPopup } from '../components/utils.js';
import { createCardElement } from './cards.js';
import {
  nameInput,
  userName,
  userDescription,
  descriptionInput,
  galleryContainer,
  cardsForm,
  placeNameInput,
  placeLinkInput,
} from '../components/variables.js';
import { disableButton, validationConfig } from './validate.js';
import { closePopup } from '../components/utils.js';

const photoSizeBig = document.querySelector('.popup__image'); // Фото в модальном окне
const photoCaption = document.querySelector('.popup__img-caption'); // Подпись к фото в модальном окне
const imagePopup = document.querySelector('.popup_type_img'); // Окно просмотра фотографии
const cardAdderPopup = document.querySelector('.popup_type_card_adder'); // Окно добавления карточки
const editorPopup = document.querySelector('.popup_type_profile-editor'); // Окно редактирования профиля

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

function editorFormHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(editorPopup);
}

function cardFormHandler(evt) {
  evt.preventDefault();
  const createBtn = cardsForm.querySelector('.form__save-button');
  galleryContainer.prepend(createCardElement(placeNameInput.value, placeLinkInput.value));
  cardsForm.reset();
  disableButton(createBtn, validationConfig);
  closePopup(cardAdderPopup);
}

export {
  expendPhoto,
  openProfileEditor,
  openCardCreator,
  editorPopup,
  cardAdderPopup,
  editorFormHandler,
  cardFormHandler,
};
