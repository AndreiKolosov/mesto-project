import '../pages/index.css';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import {
  apiConfig,
  userNameSelector,
  userAvatarSelector,
  userDescriptionSelector,
  cardTemplateSelector,
  galleryContainerSelector,
  validationConfig,
  editBtn,
  addBtn,
  avatarChangeBtn,
} from '../utils/variables.js';

const api = new Api(apiConfig);
const imagePopup = new PopupWithImage('.popup_type_img');
const deleteConfirmationPopup = new PopupWithConfirm(
  '.popup_type_confirm',
  handleDeleteConfirmation
);
const cardAddFormValidator = new FormValidator('card-form', validationConfig);
const profileEditFormValidator = new FormValidator('editor-form', validationConfig);
const avatarEditFormValidator = new FormValidator('avatar-form', validationConfig);
const cardList = new Section(
  {
    //data: cardsData,
    renderer: (item, user) => {
      const likedByMe = checkLikeState(item, user);
      const card = new Card(
        item,
        cardTemplateSelector,
        handleLikeClick,
        openDeleteConfirmationPopup,
        openImage,
        likedByMe
      );
      const cardElement = card.createCardElement(user._id);
      cardList.setItem(cardElement);
    },
  },
  galleryContainerSelector
);

// первоначальня загрузка информации с сервера
Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cardsData]) => {
    //создание экземпляра пользователя и заполнение его полей
    cardList._renderedItems = cardsData;
    const currentUser = new UserInfo(
      userData,
      userNameSelector,
      userDescriptionSelector,
      userAvatarSelector
    );
    currentUser.setUserInfo();
    currentUser.setUserAvatar();
    cardList.renderItems(currentUser);

    return [currentUser, cardList];
  })
  .then(([currentUser, cardList]) => {
    //создание инстанса попапа редактирования данных юзера
    const userEditPopup = new PopupWithForm(
      '.popup_type_profile-editor',
      updateUserInfo,
      openUserEditPopup
    );
    userEditPopup.setEventListeners();
    //создание инстанса попапа редактирования аватара
    const avatarEditPopup = new PopupWithForm(
      '.popup_type_avatar-editor',
      updateAvatar,
      openAvatarEditPopup
    );
    avatarEditPopup.setEventListeners();
    //создание инстанса попапа добавления карточки
    const cardAdderPopup = new PopupWithForm(
      '.popup_type_card-adder',
      addNewCard,
      openCardAdderPopup
    );
    cardAdderPopup.setEventListeners();

    //обработчик отправки формы, который передается в конструктор экземпляра класса
    function updateUserInfo() {
      this.submitButton.textContent = 'Сохранение...';
      api
        .updateUser(
          this._popup.querySelector('#name').value,
          this._popup.querySelector('#about').value
        )
        .then((res) => {
          currentUser.name = res.name;
          currentUser.description = res.about;
          currentUser.setUserInfo();
          this.close();
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
      profileEditFormValidator.resetValidity();
      userEditPopup.setInputValues(currentUser);
      this.open();
    }

    //обработчик отправки формы редактирования аватара
    function updateAvatar() {
      this.submitButton.textContent = 'Сохранение...';
      api
        .updateAvatar(this._popup.querySelector('#user-avatar').value)
        .then((res) => {
          currentUser.avatar = res.avatar;
          currentUser.setUserAvatar();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.submitButton.textContent = 'Сохранить';
        });
    }

    function openAvatarEditPopup() {
      avatarEditFormValidator.resetValidity();
      this.open();
    }

    function addNewCard() {
      this.submitButton.textContent = 'Сохранение...';
      api
        .createCard(
          this._popup.querySelector('#place-name').value,
          this._popup.querySelector('#place-img-link').value
        )
        .then((res) => {
          const likedByMe = checkLikeState(res, currentUser);
          const card = new Card(
            res,
            cardTemplateSelector,
            handleLikeClick,
            openDeleteConfirmationPopup,
            openImage,
            likedByMe
          );
          const cardElement = card.createCardElement(currentUser._id);
          cardList.setItem(cardElement);
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.submitButton.textContent = 'Сохранить';
        });
    }

    function openCardAdderPopup() {
      cardAddFormValidator.resetValidity();
      this.open();
    }

    // Вешаем слушатели
    addBtn.addEventListener('click', function () {
      cardAdderPopup._handleOpenForm();
    });
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

//обработчик подтверждения удаления карточки
function handleDeleteConfirmation() {
  this.confirmButton.textContent = 'Удаление...';
  api
    .deleteCard(this.cardId)
    .then((deleteMessage) => {
      const card = document.getElementById(this.cardId);
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.close();
      this.confirmButton.textContent = 'Да';
    });
}

//функция обработчик нажатия на кнопку Like
function handleLikeClick(card) {
  const action = card.selectLikeAction();
  api
    .setLike(card.getId(), action)
    .then((card) => {
      this._renderLikeCount(card);
      this._renderLike();
      this._isLikedByMe = !this._isLikedByMe;
    })
    .catch((err) => {
      console.log(err);
    });
}

// функция проверки наличия нашего пользователя среди лайкнувших карточку
function checkLikeState(card, user) {
  return Boolean(card.likes.find((like) => like._id === user._id));
}
//обработчик нажатия на кнопку удаления карточки
const openDeleteConfirmationPopup = (card) => {
  deleteConfirmationPopup.cardId = card.getId();
  deleteConfirmationPopup.open();
};

//Открытие модального окна просмотра картинки
function openImage(card) {
  imagePopup.open(card);
}
//метод объекта PopupWithImage, который наполняет разметку попапа картинки и открывает его
// function openImagePopup(card) {
//   this._popup.querySelector('.popup__image').src = card.link;
//   this._popup.querySelector('.popup__image').alt = card.name;
//   this._popup.querySelector('.popup__img-caption').textContent = card.name;
//   this.open();
// }

deleteConfirmationPopup.setEventListener();
cardAddFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();
