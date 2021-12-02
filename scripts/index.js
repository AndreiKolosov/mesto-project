// Находим кнопку открытия формы редактирования профиля и объявляем переменную
let profileEditBtn = document.querySelector(".profile__edit-button");
// Находим кнопку закрытия формы редактирования профиля и объявляем переменную
let closePopupBtn = document.querySelector(".popup__close-button");
// Находим окно формы и объявляем переменную
let editWindow = document.querySelector(".popup");

// Создаем функцию-обработчик, добавляющую класс окну формы
function openPopup() {
  editWindow.classList.add("popup_opened");
}

// Вешаем слушатель события clik на кнопку редактирования и
profileEditBtn.addEventListener("click", openPopup);

// Тоже, что и сверху, только функция-обработчик события внутри.
// Запись выглядит немного короче
closePopupBtn.addEventListener("click", function () {
  editWindow.classList.remove("popup_opened");
});

// Реализую редактирование профиля
// Выбираю форму
const formElement = document.querySelector(".form");
// Поля ввода
const nameInput = document.querySelector("#user-name");
const descriptionInput = document.querySelector("#user-description");
//  Выбираю элементы, которые буду менять с помощью value
const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__description");
//  Кнопка сохранить
const saveEdits = document.querySelector(".form__save-button");

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;

  // При клике на кнопку сохранить удаляется класс и закрывается модальное окно
  saveEdits.addEventListener("click", function () {
    editWindow.classList.remove("popup_opened");
  });
}

//
formElement.addEventListener("submit", formSubmitHandler);
