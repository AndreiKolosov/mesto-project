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
