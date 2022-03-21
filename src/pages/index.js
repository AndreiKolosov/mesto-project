import '../pages/index.css';
import { enableValidation, validationConfig } from '../components/validate.js';
import Card from '../components/cards.js';
//import { closePopup } from '../components/utils';
import {
  cardsForm,
  userInfoForm,
  avatarForm,
  userName,
  userDescription,
  userAvatar,
  config,
  userNameSelector,
  userAvatarSelector,
  userDescriptionSelector,
  cardTemplateSelector,
  galleryContainerSelector,
} from '../components/variables.js';
import {
  openProfileEditor,
  openCardCreator,
  openAvatarEditor,
  //updateUserInfo,
  createNewCard,
  updateAvatar,
} from '../components/modal.js';
import Api from '../components/api.js';
import Section from '../components/section.js';
import User from '../components/user.js';
import PopupWithForm from '../components/PopupWithForm.js';

const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const avatarCangeBtn = document.querySelector('.profile__avatar-container'); // Кнопка смены аватара
const popups = Array.from(document.querySelectorAll('.popup')); // Попапы
const api = new Api(config);

// первоначальня загрузка информации с сервера
Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cardsData]) => {
    
    //создание экземпляра пользователя и заполнение его полей
    const currentUser = new User(
      userData,
      userNameSelector,
      userDescriptionSelector,
      userAvatarSelector
    );
    currentUser.setUserInfo();

    //создание экземпляра контейнера для карточек
    const cardList = new Section(
      {
        data: cardsData,
        renderer: (item) => {
          const likedByMe = checkLikeState(item, userData);
          const card = new Card(
            item,
            cardTemplateSelector,
            handleLikeClick,
            handleDeleteClick,
            likedByMe
          );
          const cardElement = card.createCardElement(currentUser._id);
          cardList.setItem(cardElement);
        },
      },
      galleryContainerSelector
    );
    cardList.renderItems();
    return [currentUser, cardList];
  })
  .then(([{userNameElement, userDescriptionElement, name, description}, cardList]) => {
    const userEditPopup = new PopupWithForm(
      '.popup_type_profile-editor',
      updateUserInfo,
      editUserInfo
    );
    userEditPopup.setEventListeners();
    //обработчик отправки формы, который передается в конструктор экземпляра класса
    function updateUserInfo() {
      this.submitButton.textContent = 'Сохранение...';
      api.updateUser(this._popup.querySelector('#user-name').value, this._popup.querySelector('#user-description').value)
    .then((res) => {
      name = res.name;
      description = res.about;
      userNameElement.textContent = res.name;
      userDescriptionElement.textContent = res.about;
      //disableButton(saveUserBtn, validationConfig);
      
      this._close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.submitButton.textContent = 'Сохранить';
    });
    }

    //функция обработчик открытия формы, которая передается в конструктор экземпляра класса 
    function editUserInfo() {
      this._popup.querySelector('#user-name').value = userNameElement.textContent;
      this._popup.querySelector('#user-description').value =
       userDescriptionElement.textContent;
       console.log(this.formInputs);
      this._open();
    }

    avatarCangeBtn.addEventListener('click', openAvatarEditor);
    // editBtn.addEventListener('click', openProfileEditor);
    editBtn.addEventListener('click', function () {
      userEditPopup._handleOpenForm();
    });
  })
  .catch((err) => {
    console.log(err);
  });

//функция обработчик нажатия на кнопку Like
function handleLikeClick(likeBtn) {
  const action = this._selectLikeAction();
  api
    .setLike(this.id, action)
    .then((card) => {
      this._renderLikeCount(card);
      this._renderLike(likeBtn);
      this._isLikedByMe = !this._isLikedByMe;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteClick() {}
//функция проверки наличия нашего пользователя среди лайкнувших карточку
function checkLikeState(card, user) {
  return Boolean(card.likes.find((like) => like._id === user._id));
}

// popups.forEach((element) => {
//   element.addEventListener('click', (evt) => {
//     if (
//       evt.target.classList.contains('popup__close-button') ||
//       evt.target.classList.contains('popup')
//     ) {
//       closePopup(element);
//     }
//   });
// });
enableValidation(validationConfig);

addBtn.addEventListener('click', openCardCreator);
//userInfoForm.addEventListener('submit', updateUserInfo);
cardsForm.addEventListener('submit', createNewCard);
avatarForm.addEventListener('submit', updateAvatar);
