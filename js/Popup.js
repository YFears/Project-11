export class Popup {
    constructor(popup, closeButton) {
        this.popup = popup;
        this.closeButton = closeButton;
        this.closeButton.addEventListener('click', this.close.bind(this));
    }
    
    open = (event) => {
        if (event.target.classList.contains('place-card__image')) {
            this.popup.classList.toggle('popup_is-opened');
            this.popup.querySelector('.popup__image').setAttribute('src', `${event.target.getAttribute('style').slice(22, length - 1)}`)
        }
        if (event.target.classList.contains('user-info__button')) {
            this.popup.classList.toggle('popup_is-opened');
        }
        if (event.target.classList.contains('user-info__edit')) {
            this.popup.classList.toggle('popup_is-opened');
        }
        if (event.target.classList.contains('user-info__photo')) {
            this.popup.classList.toggle('popup_is-opened');
        }
    }

    close = () => {
        this.popup.classList.toggle('popup_is-opened');
    }
}
