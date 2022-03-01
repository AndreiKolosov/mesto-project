import '../pages/index.css';
import { enableValidation, validationConfig } from '../components/validate.js';
import { renderCards } from '../components/cards.js';
import { closePopup } from '../components/utils';
import {
  galleryContainer,
  cardsForm,
  userInfoForm,
  avatarForm,
  userName,
  userDescription,
  userAvatar,
} from '../components/variables.js';
import {
  openProfileEditor,
  openCardCreator,
  openAvatarEditor,
  userFormHandler,
  cardFormHandler,
  avatarFormHandler,
} from '../components/modal.js';
import API from '../components/api.js';

const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const avatarCangeBtn = document.querySelector('.profile__avatar-container'); // Кнопка смены аватара
const popups = Array.from(document.querySelectorAll('.popup')); // Попапы
const getUser = API.getUser();
const getCards = API.getCards();
const initPromises = [getUser, getCards];

popups.forEach((element) => {
  element.addEventListener('click', (evt) => {
    if (
      evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup')
    ) {
      closePopup(element);
    }
  });
});
enableValidation(validationConfig);
avatarCangeBtn.addEventListener('click', openAvatarEditor);
editBtn.addEventListener('click', openProfileEditor);
addBtn.addEventListener('click', openCardCreator);
userInfoForm.addEventListener('submit', userFormHandler);
cardsForm.addEventListener('submit', cardFormHandler);
avatarForm.addEventListener('submit', avatarFormHandler);

Promise.all(initPromises)
  .then((res) => {
    const user = res[0];
    const cards = res[1];
    userName.textContent = user.name;
    userDescription.textContent = user.about;
    userAvatar.src = user.avatar;
    renderCards(cards, galleryContainer);
  })
  .catch((err) => {
    console.log(err);
  });
