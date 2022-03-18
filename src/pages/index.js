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
  config,
} from '../components/variables.js';
import {
  openProfileEditor,
  openCardCreator,
  openAvatarEditor,
  updateUserInfo,
  createNewCard,
  updateAvatar,
} from '../components/modal.js';
import Api from '../components/api.js';

const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const avatarCangeBtn = document.querySelector('.profile__avatar-container'); // Кнопка смены аватара
const popups = Array.from(document.querySelectorAll('.popup')); // Попапы
const api = new Api(config);

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
userInfoForm.addEventListener('submit', updateUserInfo);
cardsForm.addEventListener('submit', createNewCard);
avatarForm.addEventListener('submit', updateAvatar);

Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cardsData]) => {
    const user = userData;
    const cards = cardsData;
    userName.textContent = user.name;
    userDescription.textContent = user.about;
    userAvatar.src = user.avatar;
    renderCards(cards, user._id, galleryContainer);
  })
  .catch((err) => {
    console.log(err);
  });
