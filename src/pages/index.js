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
// import {
//   openProfileEditor,
//   openCardCreator,
//   openAvatarEditor,
//   //updateUserInfo,
//   createNewCard,
//   updateAvatar,
// } from '../components/modal.js';
import Api from '../components/api.js';
import Section from '../components/section.js';
import User from '../components/user.js';
import PopupWithForm from '../components/PopupWithForm.js';

const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const avatarChangeBtn = document.querySelector('.profile__avatar-container'); // Кнопка смены аватара
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
    currentUser.setUserAvatar();

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
  .then(([currentUser,
    cardList]) => {
    const userEditPopup = new PopupWithForm(
      '.popup_type_profile-editor',
      updateUserInfo,
      openUserEditPopup
    );
    userEditPopup.setEventListeners();

    const avatarEditPopup = new PopupWithForm(
      '.popup_type_avatar-editor',
      updateAvatar,
      openAvatarEditPopup
    );
    avatarEditPopup.setEventListeners();

    //обработчик отправки формы, который передается в конструктор экземпляра класса
    function updateUserInfo() {
      this.submitButton.textContent = 'Сохранение...';
      api.updateUser(this._popup.querySelector('#user-name').value, this._popup.querySelector('#user-description').value)
    .then((res) => {
      currentUser.name = res.name;
      currentUser.description = res.about;
      currentUser.setUserInfo();
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

  //обработчик открытия формы, которая передается в конструктор экземпляра класса 
  function openUserEditPopup() {
    console.log('I work');
    this._popup.querySelector('#user-name').value = currentUser.userNameElement.textContent;
    this._popup.querySelector('#user-description').value =
    currentUser.userDescriptionElement.textContent;
    this._open();
  }

  //обработчик отправки формы редактирования аватара
  function updateAvatar() {
    this.submitButton.textContent = 'Сохранение...';
    api.updateAvatar(this._popup.querySelector('#user-avatar').value)
    .then((res) => {
      //console.log('current avatar' + avatar);
      currentUser.avatar = res.avatar;
      //console.log('new avatar' + avatar);
      currentUser.setUserAvatar();
      //console.log('last' + userAvatarElement.src);
      this._close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.submitButton.textContent = 'Сохранить';
    });
  }

  function openAvatarEditPopup() {
    this._form.reset();
    this._open();
  }

    // ________________________________________________________________Вешаем слушатели
    avatarChangeBtn.addEventListener('click', function () {
      avatarEditPopup._handleOpenForm();
    });
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

  

enableValidation(validationConfig);

//addBtn.addEventListener('click', openCardCreator);
//userInfoForm.addEventListener('submit', updateUserInfo);
//cardsForm.addEventListener('submit', createNewCard);
//avatarForm.addEventListener('submit', updateAvatar);
