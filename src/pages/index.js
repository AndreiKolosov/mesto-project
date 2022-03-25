import '../pages/index.css';
import Card from '../components/cards.js';
import {
  config,
  userNameSelector,
  userAvatarSelector,
  userDescriptionSelector,
  cardTemplateSelector,
  galleryContainerSelector,
  validationConfig,
} from '../components/variables.js';
import Api from '../components/api.js';
import Section from '../components/section.js';
import User from '../components/user.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';

const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const avatarChangeBtn = document.querySelector('.profile__avatar-container'); // Кнопка смены аватара
const api = new Api(config);
const imagePopup = new PopupWithImage('.popup_type_img', openImagePopup);
const formValidator = new FormValidator(validationConfig, resetFormValidity);
const deleteConfirmationPopup = new PopupWithConfirm(
  '.popup_type_confirm',
  handleDeleteConfirmation
);

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
            openDeleteConfirmationPopup,
            openImage,
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
  .then(([currentUser, cardList]) => {
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
          this._popup.querySelector('#user-name').value,
          this._popup.querySelector('#user-description').value
        )
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
      formValidator.resetValidity(this._popup);
      this._popup.querySelector('#user-name').value = currentUser.userNameElement.textContent;
      this._popup.querySelector('#user-description').value =
        currentUser.userDescriptionElement.textContent;
      this._open();
    }

    //обработчик отправки формы редактирования аватара
    function updateAvatar() {
      this.submitButton.textContent = 'Сохранение...';
      api
        .updateAvatar(this._popup.querySelector('#user-avatar').value)
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
      formValidator.resetValidity(this._popup);
      this._open();
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
          this._close();
        })

        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.submitButton.textContent = 'Сохранить';
        });
    }

    function openCardAdderPopup() {
      this._form.reset();
      formValidator.resetValidity(this._popup);
      this._open();
    }

    // ________________________________________________________________Вешаем слушатели

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
function handleDeleteConfirmation(card) {
  //console.log(card);
  this.confirmButton.textContent = 'Удаление...';
  api
    .deleteCard(card.id)
    .then((deleteMessage) => {
      card._removeCard();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this._close(card);
      this.confirmButton.textContent = 'Да';
    });
}


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

// функция проверки наличия нашего пользователя среди лайкнувших карточку
function checkLikeState(card, user) {
  return Boolean(card.likes.find((like) => like._id === user._id));
}

const openDeleteConfirmationPopup = (card) => {
  deleteConfirmationPopup.setEventListener(card);
  deleteConfirmationPopup._open();
};

//___________________________________________________________Открытие модального окна просмотра формы
function openImage(card) {
  imagePopup.handleOpenPopup(card);
}
//метод объекта PopupWithImage, который наполняет разметку попапа картинки и открывает его
function openImagePopup(card) {
  this._popup.querySelector('.popup__image').src = card.link;
  this._popup.querySelector('.popup__image').alt = card.name;
  this._popup.querySelector('.popup__img-caption').textContent = card.name;
  this._open();
}

//сброс сообщений об ошибках валидации
function resetFormValidity(openPopup) {
  const formElement = openPopup.querySelector(this._formSelector);
  //const errorElement = openPopup.querySelector(`.${inputElement.id}_error`);

  const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
  // const buttonElement = formElement.querySelector(this._buttonSelector);
  inputList.forEach((inputElement) => {
    this._hideInputError(inputElement, openPopup.querySelector(`.${inputElement.id}_error`));
  });
  this._toggleButtonState(formElement, inputList);
}

formValidator.enableValidation();