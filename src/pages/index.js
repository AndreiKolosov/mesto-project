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

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig); 

const currentUser = new UserInfo(
  userNameSelector,
  userDescriptionSelector,
  userAvatarSelector
  );

const cardList = new Section(
  {
    createItem: (item, user) => {
      const likedByMe = checkLikeState(item, user);
      const card = new Card(
        item,
        cardTemplateSelector,
        handleLikeClick,
        openDeleteConfirmationPopup,
        openImage,
        likedByMe
      );
      const cardElement = card.createCardElement(user.id);
      return cardElement;
    },
  },
  galleryContainerSelector
); 

//создание инстанса попапа редактирования данных юзера
const userEditPopup = new PopupWithForm(
  '.popup_type_profile-editor',
   updateUserInfo,
);

//создание инстанса попапа редактирования аватара
const avatarEditPopup = new PopupWithForm(
  '.popup_type_avatar-editor',
  updateAvatar,
);

//создание инстанса попапа добавления карточки
const cardAdderPopup = new PopupWithForm(
  '.popup_type_card-adder',
   addNewCard,
);
      
// первоначальня загрузка информации с сервера
Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cardsData]) => {
    cardList.renderedItems = cardsData;
    currentUser.setUserInfo(userData);
    cardList.renderItems(currentUser);
    return [currentUser, cardList];
   })
  .catch((err) => {
    console.log(err);
  });

//обработчик отправки формы редактирования аватара
function updateAvatar(inputValues) {
  avatarEditPopup.renderLoading(true);
  const {avatar} = inputValues
  api.updateAvatar(avatar)
    .then((res) => {
      currentUser.setUserInfo(res);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarEditPopup.renderLoading(false);
    });
  }
  
 
function addNewCard(inputValues) {
  cardAdderPopup.renderLoading(true);
  const placeName = inputValues['place-name'];
  const placeLink = inputValues['place-img-link'];
  api.createCard(placeName, placeLink)
    .then((res) => {
    cardList.addItem(cardList.createItem(res, currentUser));
    cardAdderPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardAdderPopup.renderLoading(false);
    });
}
      
//обработчик подтверждения удаления карточки
function handleDeleteConfirmation() {
  deleteConfirmationPopup.renderLoading(true);
   api
   .deleteCard(deleteConfirmationPopup.cardId)
    .then((deleteMessage) => {
       const card = document.getElementById(deleteConfirmationPopup.cardId);
      card.remove();
      deleteConfirmationPopup.close();
    })
    .catch((err) => {
       console.log(err);
     })
     .finally(() => {
      deleteConfirmationPopup.renderLoading(false);
 });
}

//обработчик отправки формы, который передается в конструктор экземпляра класса
function updateUserInfo(inputValues) {
  userEditPopup.renderLoading(true);
  const {name, about} = inputValues;
  api.updateUser(name, about)
      .then((res) => {
        currentUser.setUserInfo(res);
        userEditPopup.close();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      userEditPopup.renderLoading(false);
    });
}

//функция обработчик нажатия на кнопку Like
function handleLikeClick(card) {
  const action = card.selectLikeAction();
  api.setLike(card.getId(), action)
    .then((res) => {
      card.renderLikeCount(res);
      card.renderLike();
      card.isLikedByMe = !card.isLikedByMe;
    })
    .catch((err) => {
      console.log(err);
    });
}

// функция проверки наличия нашего пользователя среди лайкнувших карточку
function checkLikeState(card, user) {
  return Boolean(card.likes.find((like) => like._id === user.id));
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

userEditPopup.setEventListeners();
cardAdderPopup.setEventListeners();
avatarEditPopup.setEventListeners();
imagePopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();

// Вешаем слушатели на кнопки
addBtn.addEventListener('click', function () {
  formValidators['card-form'].resetValidity();
  cardAdderPopup.open();
});
avatarChangeBtn.addEventListener('click', function () {
  formValidators['avatar-form'].resetValidity();
  avatarEditPopup.open();
});
editBtn.addEventListener('click', function () {
  formValidators['editor-form'].resetValidity();
  userEditPopup.setInputValues(currentUser.getUserInfo());
  userEditPopup.open();
});
