import { openPopup, closePopup } from '../components/utils.js';
import Card from './cards.js';
import {
  nameInput,
  userName,
  userDescription,
  descriptionInput,
  userInfoForm,
  cardsForm,
  avatarForm,
  confirmForm,
  placeNameInput,
  placeLinkInput,
  avatarLinkInput,
  confirmIdInput,
  userAvatar,
} from '../components/variables.js';
import { disableButton, validationConfig } from './validate.js';
import Api from './api.js';

const photoSizeBig = document.querySelector('.popup__image'); // Фото в модальном окне
const photoCaption = document.querySelector('.popup__img-caption'); // Подпись к фото в модальном окне
const imagePopup = document.querySelector('.popup_type_img'); // Окно просмотра фотографии
const cardAdderPopup = document.querySelector('.popup_type_card-adder'); // Окно добавления карточки
const userInfEditorPopup = document.querySelector('.popup_type_profile-editor'); // Окно редактирования профиля
const avatarEditorPopup = document.querySelector('.popup_type_avatar-editor'); // Окно редактирования профиля
const confirmPopup = document.querySelector('.popup_type_confirm'); // Окно подтверждения действия
const saveUserBtn = userInfoForm.querySelector('.form__save-button');
const saveAvatarBtn = avatarForm.querySelector('.form__save-button');
const createCardBtn = cardsForm.querySelector('.form__save-button');
const agreeBtn = confirmForm.querySelector('.form__save-button');

function openConfirmPopup(cardId) {
  confirmIdInput.value = cardId;
  agreeBtn.removeAttribute('disabled');
  agreeBtn.classList.remove('form__save-button_disabled');
  // const handler = () => removeCard(confirmIdInput.value);
  agreeBtn.addEventListener('click', removeCard);
  openPopup(confirmPopup);
}

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

function expandPhoto(evt) {
  const image = evt.target.closest('.card__image'); // Элемент Img в карточке
  openPopup(imagePopup);
  photoSizeBig.src = image.src;
  photoSizeBig.alt = image.alt;
  photoCaption.textContent = image.alt;
} // Развернуть окно просмотра карточки

//   Убрал evt.prevetDefault из функций-обработчиков форм потому-что при включении
// валидации отменяется стандартная отправка всех форм
function updateUserInfo() {
  saveUserBtn.textContent = 'Сохранение...';
  API.updateUser(nameInput.value, descriptionInput.value)
    .then((res) => {
      userName.textContent = res.name;
      userDescription.textContent = res.about;
      disableButton(saveUserBtn, validationConfig);
      closePopup(userInfEditorPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveUserBtn.textContent = 'Сохранить';
    });
}

function updateAvatar() {
  saveAvatarBtn.textContent = 'Сохранение...';
  API.updateAvatar(avatarLinkInput.value)
    .then((res) => {
      userAvatar.src = res.avatar;
      avatarForm.reset();
      disableButton(saveAvatarBtn, validationConfig);
      closePopup(avatarEditorPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveAvatarBtn.textContent = 'Сохранить';
    });
}

function createNewCard() {
  createCardBtn.textContent = 'Сохранение...';
  API.createCard(placeNameInput.value, placeLinkInput.value)
    .then((res) => {
      galleryContainer.prepend(createCardElement(res, res.owner._id));
      cardsForm.reset();
      disableButton(createCardBtn, validationConfig);
      closePopup(cardAdderPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      createCardBtn.textContent = 'Создать';
    });
}

function removeCard() {
  const cardId = confirmIdInput.value;
  const card = document.getElementById(`${cardId}`);
  agreeBtn.textContent = 'Удаление...';
  API.deleteCard(cardId)
    .then(() => {
      card.remove();
      closePopup(confirmPopup);
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      agreeBtn.textContent = 'Да';
      // confirmIdInput.value = '';
    });
}

export {
  expandPhoto,
  openProfileEditor,
  openAvatarEditor,
  openCardCreator,
  openConfirmPopup,
  updateUserInfo,
  createNewCard,
  updateAvatar,
};
