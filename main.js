(()=>{"use strict";function e(e){e.classList.add("popup_opened"),document.addEventListener("keydown",r)}function t(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",r)}function r(e){"Escape"===e.key&&t(document.querySelector(".popup_opened"))}var n=document.querySelector(".profile__name"),o=document.querySelector(".profile__description"),c=document.querySelector("#user-name"),a=document.querySelector("#user-description"),u=document.querySelector("#place-name"),i=document.querySelector("#place-img-link"),s={formSelector:".form",inputSelector:".form__item",buttonSelector:".form__save-button",buttonInactiveClass:"form__save-button_disabled",errorElementClass:"form__item-error_active",inputErrorClass:"form__item_type_error"},l=function(e,t){e.classList.add(t.buttonInactiveClass),e.disabled=!0},d=function(e,t,r){var n=e.querySelector(r.buttonSelector);!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t.buttonInactiveClass),e.disabled=!1}(n,r):l(n,r)},p=document.querySelector(".popup__image"),m=document.querySelector(".popup__img-caption"),f=document.querySelector(".popup_type_img"),y=document.querySelector(".popup_type_card_adder"),v=document.querySelector(".popup_type_profile-editor");function _(t){var r=t.target.closest(".card__image");e(f),p.src=r.src,p.alt=r.alt,m.textContent=r.alt}var S=document.querySelector(".card-template").content;function b(e){e.target.closest(".card").remove()}function q(){this.classList.toggle("card__like-button_active")}function g(e,t){var r=S.querySelector(".card").cloneNode(!0),n=r.querySelector(".card__trash-button"),o=r.querySelector(".card__like-button"),c=r.querySelector(".card__name"),a=r.querySelector(".card__image");return c.textContent=e,a.src=t,a.alt=e,o.addEventListener("click",q),n.addEventListener("click",b),a.addEventListener("click",_),r}var k=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].map((function(e){return g(e.name,e.link)}));function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var L,h,C=document.querySelector(".profile__edit-button"),x=document.querySelector(".profile__add-button"),A=document.querySelector("#editor-form"),j=document.querySelector("#adder-form"),I=document.querySelector(".galery__list");Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("click",(function(r){(r.target.classList.contains("popup__close-button")||r.target.classList.contains("popup"))&&t(e)}))})),I.append.apply(I,function(e){if(Array.isArray(e))return E(e)}(L=k)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(L)||function(e,t){if(e){if("string"==typeof e)return E(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?E(e,t):void 0}}(L)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),C.addEventListener("click",(function(){c.value=n.textContent,a.value=o.textContent,e(v)})),x.addEventListener("click",(function(){e(y)})),A.addEventListener("submit",(function(e){e.preventDefault(),n.textContent=c.value,o.textContent=a.value,t(v)})),j.addEventListener("submit",(function(e){e.preventDefault();var r=j.querySelector(".form__save-button");I.prepend(g(u.value,i.value)),j.reset(),l(r,s),t(y)})),h=s,Array.from(document.querySelectorAll(h.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector));d(e,r,t),r.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,r){var n=e.querySelector(".".concat(t.id,"_error"));t.validity.valid?function(e,t,r){e.classList.remove(r.inputErrorClass),t.classList.remove(r.errorElementClass),t.textContent=""}(t,n,r):function(e,t,r,n){e.classList.add(n.inputErrorClass),t.classList.add(n.errorElementClass),t.textContent=r}(t,n,t.validationMessage,r)}(e,n,t),d(e,r,t)}))}))}(e,h)}))})();