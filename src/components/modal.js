import { openPopup } from '../components/utils.js';
import { nameInput, userName, userDescription, descriptionInput } from '../components/variables.js';
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

export { expendPhoto, openProfileEditor, openCardCreator, editorPopup, cardAdderPopup };
