import { openPopup, closePopup } from '../components/utils.js';
import { createCardElement } from './cards.js';
import {
  nameInput,
  userName,
  userDescription,
  descriptionInput,
  galleryContainer,
  userInfoForm,
  cardsForm,
  avatarForm,
  placeNameInput,
  placeLinkInput,
  avatarLinkInput,
  userAvatar,
} from '../components/variables.js';
import { disableButton, validationConfig } from './validate.js';
import API from './api.js';

const photoSizeBig = document.querySelector('.popup__image'); // Фото в модальном окне
const photoCaption = document.querySelector('.popup__img-caption'); // Подпись к фото в модальном окне
const imagePopup = document.querySelector('.popup_type_img'); // Окно просмотра фотографии
const cardAdderPopup = document.querySelector('.popup_type_card_adder'); // Окно добавления карточки
const userInfEditorPopup = document.querySelector('.popup_type_profile-editor'); // Окно редактирования профиля
const avatarEditorPopup = document.querySelector('.popup_type_avatar-editor'); // Окно редактирования профиля

function openProfileEditor() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(userInfEditorPopup);
}

function openCardCreator() {
  openPopup(cardAdderPopup);
}

function openAvatarEditor() {
  openPopup(avatarEditorPopup);
}

function expendPhoto(evt) {
  const image = evt.target.closest('.card__image'); // Элемент Img в карточке
  openPopup(imagePopup);
  photoSizeBig.src = image.src;
  photoSizeBig.alt = image.alt;
  photoCaption.textContent = image.alt;
} // Развернуть окно просмотра карточки

//   Убрал evt.prevetDefault из функций-обработчиков форм потому-что при включении
// валидации отменяется стандартная отправка всех форм
function userFormHandler() {
  const createBtn = userInfoForm.querySelector('.form__save-button');
  API.updateUser(nameInput.value, descriptionInput.value)
    .then((res) => {
      userName.textContent = res.name;
      userDescription.textContent = res.about;
      disableButton(createBtn, validationConfig);
      closePopup(userInfEditorPopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

function avatarFormHandler() {
  const createBtn = avatarForm.querySelector('.form__save-button');
  API.updateAvatar(avatarLinkInput.value)
    .then((data) => {
      userAvatar.src = data.avatar;
      avatarForm.reset();
      disableButton(createBtn, validationConfig);
      closePopup(avatarEditorPopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

function cardFormHandler() {
  const createBtn = cardsForm.querySelector('.form__save-button');
  galleryContainer.prepend(createCardElement(placeNameInput.value, placeLinkInput.value));
  cardsForm.reset();
  disableButton(createBtn, validationConfig);
  closePopup(cardAdderPopup);
}

export {
  expendPhoto,
  openProfileEditor,
  openAvatarEditor,
  openCardCreator,
  userFormHandler,
  cardFormHandler,
  avatarFormHandler,
};
