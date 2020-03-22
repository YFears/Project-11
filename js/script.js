import {Popup} from './Popup.js';
import {Userinfo} from './Userinfo.js';
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
import {Api} from './api.js';
(function () {
    const formPlace = document.forms.new;
    const formProfile = document.forms.profile;
    const formAvatar = document.forms.avatar;
    const placesList = document.querySelector('.places-list');

    function getNewCard(place) {
        const newPlace = new Card(place);
        return newPlace.placeCard;
    }

    const imagePopup = new Popup(document.querySelector('.popup-zoom'), document.querySelector('.popup-zoom .popup__close'));
    placesList.addEventListener('click', imagePopup.open);

    const popupProfile = document.querySelector('.popup-pro');
    const popupProfileClose = document.querySelector('.popup-pro .popup__close');
    const popupUserEditButton = document.querySelector('.user-info__edit');
    const popupEditInputName = formProfile.elements.name;
    const popupEditInputLink = formProfile.elements.link;
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoPro = document.querySelector('.user-info__job');
    const popupProTipName = document.querySelector('.popup-pro .popup__tip-name');
    const popupProTipLink = document.querySelector('.popup-pro .popup__tip-link');
    const popupPlaceTipName = document.querySelector('.popup-place .popup__tip-name');
    const popupPlaceTipLink = document.querySelector('.popup-place .popup__tip-link');
    const popupProfileButton = document.querySelector('.popup-pro .popup__button');
    const popupPlaceButton = document.querySelector('.popup-place .popup__button');
    const user = new Userinfo(popupEditInputName, popupEditInputLink, userInfoName, userInfoPro);
    const proPopup = new Popup(popupProfile, popupProfileClose);
    const validator = new FormValidator(formProfile, popupProTipName, popupProTipLink, popupProfileButton);
    validator.setEventListeners();
    const popupPlace = document.querySelector('.popup-place');
    const popupButton = document.querySelector('.user-info__button');
    const popupPlaceClose = document.querySelector('.popup-place .popup__close');
    const placePopup = new Popup(popupPlace, popupPlaceClose);
    const validatorPlace = new FormValidator(formPlace, popupPlaceTipName, popupPlaceTipLink, popupPlaceButton);

    /* 1. Загрузка информации о пользователе с сервера
    10. Улучшенный UX при редактировании профиля */
    const api = new Api({
        baseUrl: 'https://praktikum.tk/cohort8',
        headers: {
            authorization: '77821590-12f7-454f-b816-e15abecec89c',
            'Content-Type': 'application/json'
        }
    });

    /* 8. Обновление аватара пользователя */
    /* fetch('https://praktikum.tk/cohort8/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '77821590-12f7-454f-b816-e15abecec89c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: 'https://pixs.ru/images/2020/02/17/YF.th.jpg'
            avatar: 'https://pixs.ru/images/2020/02/19/YF2.th.jpg'
        })
    }) */
    const userInfoPhoto = document.querySelector('.user-info__photo');
    const popupAvatar = document.querySelector('.popup-avatar');
    const popupAvatarClose = document.querySelector('.popup-avatar .popup__close');
    const popupAvatarTipLink = document.querySelector('.popup-avatar .popup__tip-link');
    const popupAvatarButton = document.querySelector('.popup-avatar .popup__button');
    const avatarPopup = new Popup(popupAvatar, popupAvatarClose);
    const validatorAvatar = new FormValidator(formAvatar, popupPlaceTipName, popupAvatarTipLink, popupAvatarButton);
    userInfoPhoto.addEventListener('click', (event) => {
        avatarPopup.open(event);
        validatorAvatar.renderAva();
        validatorAvatar.falseForm();
    })
    formAvatar.addEventListener('input', function () {
        validatorAvatar.setSubmitButtonStateAvatar();
    });
    formAvatar.addEventListener('submit', function (event) {
        event.preventDefault();
        renderLoading(true, popupAvatarButton);
        api.updateAvatar(formAvatar.elements.link.value)
            .then(() => {
                api.getUserData()
                    .then((res) => {
                        userInfoPhoto.style.backgroundImage = `url(${res.avatar})`;
                    })
                    .catch(error => {
                        console.log(`Error getting avatar - ${error}`);
                    })
            })
            .catch(error => {
                console.log(`Error updating avatar - ${error}`);
            })
            .finally(() => {
                renderLoading(false, popupAvatarButton);
                avatarPopup.close();
            })
    });

    api.getUserData()
        .then((res) => {
            userInfoName.textContent = res.name;
            userInfoPro.textContent = res.about;
            userInfoPhoto.style.backgroundImage = `url(${res.avatar})`;
        })
        .catch(error => console.log(`Error loading user data - ${error}`))

    /*  2. Загрузка первоначальных карточек с сервера
        5. Отображение количества лайков карточки */
    function getInfoCard(res) {
        const addListCard = new CardList(placesList, res, getNewCard);
        res.forEach((elem, index) => {
            document.querySelectorAll('.place-card')[index].querySelector('.place-card__likes').textContent = elem.likes.length;
            if (elem.owner._id === '335fb420a4cf8f511d4df8c2') {
                document.querySelectorAll('.place-card')[index].querySelector('.place-card__delete-icon').style.display = 'block';
            }
            elem.likes.forEach((element) => {
                if (element._id === '335fb420a4cf8f511d4df8c2') {
                    document.querySelectorAll('.place-card')[index].querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
                }
            });
        });
    }
    api.getInitialCards()
        .then((res) => {
            getInfoCard(res);
            /* 6. Удаление карточки */
            placesList.addEventListener('click', (event) => {
                if (event.target.classList.contains('place-card__delete-icon') && confirm('Do you realy want to delete this card?')) {
                    api.deleteCard(event.target.parentElement.parentElement.id)
                        .then(() => {
                            addListCard.remove(event);
                        })
                        .catch(error => console.log(`Error deleting card - ${error}`))
                }
            })
            /* 7. Постановка и снятие лайка */
            placesList.addEventListener('click', (event) => {
                if (event.target.classList.contains('place-card__like-icon') &&
                    !event.target.classList.contains('place-card__like-icon_liked')) {
                    api.likeCard(event.target.parentElement.parentElement.parentElement.id, true)
                        .then(() => {
                            api.getInitialCards()
                                .then((res) => {
                                    getInfoCard(res);
                                })
                        })
                        .catch(error => console.log(`Error liking card - ${error}`))
                } else if (event.target.classList.contains('place-card__like-icon_liked')) {
                    api.likeCard(event.target.parentElement.parentElement.parentElement.id, false)
                        .then(() => {
                            api.getInitialCards()
                                .then((res) => {
                                    getInfoCard(res);
                                })
                        })
                        .catch(error => console.log(`Error disliking card - ${error}`))
                }
            })
        })
        .catch(error => console.log(`Error loading cards - ${error}`));

    /* 3. Редактирование профиля */
    function renderLoading(isLoading, button) {
        if (isLoading) {
            button.textContent = 'Зазгрузка...'
        } else {
            button.textContent = 'Сохранить'
        }
    }

    formProfile.addEventListener('submit', function (event) {
        event.preventDefault();
        renderLoading(true, popupProfileButton);
        api.setUserData(popupEditInputName.value, popupEditInputLink.value)
            .then((res) => {
                userInfoName.textContent = res.name;
                userInfoPro.textContent = res.about;
                proPopup.close();
            })
            .catch(error => {
                console.log(`Error setting user data - ${error}`);
            })
            .finally(() => {
                renderLoading(false, popupProfileButton);
            });

    });
    popupUserEditButton.addEventListener('click', function (event) {
        proPopup.open(event);
        user.setUserInfo();
        validator.renderUser();
        validator.trueForm();
    });

    /* 4. Добавление новой карточки
       11. Улучшенный UX при добавлении карточки*/
    formPlace.addEventListener('input', function () {
        validatorPlace.setSubmitButtonStatePlace();
    });
    formPlace.addEventListener('submit', function (event) {
        event.preventDefault();
        renderLoading(true, popupPlaceButton);
        api.addCard(formPlace.elements.name.value, formPlace.elements.link.value)
            .then(() => {
                api.getInitialCards()
                    .then((res) => {
                        getInfoCard(res);
                    })
                    .catch(error => console.log(`Error loading - ${error}`));
            })
            .catch(error => {
                console.log(`Error adding card - ${error}`);
            })
            .finally(() => {
                renderLoading(false, popupPlaceButton);
                placePopup.close();
            })
    });
    popupButton.addEventListener('click', function (event) {
        placePopup.open(event);
        validatorPlace.render();
        validatorPlace.falseForm();
    });
})();



/*REVIEW. Резюме.

В задании проделана большая работа.
Выполнены все дополнительные пункты.

Что надо исправить.
1.Заносить данные о профиле после их редактирования на страницу только в случае успешного запроса, и
не из полей формы, а из ответа сервера, который вернёт объект с данными
профиля, которые только что сохранились на сервере (подробности в ревью в этом модуле).
2. Преобразовать метод updateUserInfo для работы с сервером (подробности в ревью в этом модуле).
3. Перенести инструкцию закрытия формы профиля при сабмите в метод then обработки
ответа сервера (подробности в ревью в этом модуле).
4. Надо убирать сообщения об ошибках с формы профиля при её открытии и делать кнопку "Сохранить" активной и чёрного цвета.
Сейчас это происходит не во всех случаях, хотя в 7-м задании у Вас этот функционал работал прекрасно!
+


REVIEW2. Резюме2

Ошибки исправлены.


Задание принято!


*/
