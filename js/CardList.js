export class CardList {
    constructor(container, initialCards, getCard) {
        this.container = container;
        this.initialCards = initialCards;
        this.getCard = getCard;
        this.render();
    }

    addCard(place) {
        this.container.appendChild(this.getCard(place));
    }

    like(event) {      
            event.target.classList.toggle('place-card__like-icon_liked');
    }
    remove(event) {
        event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
    }

    render() {
        this.container.innerHTML = '';
        for (let element of this.initialCards) {
            this.container.appendChild(this.getCard(element));
        }
    }
}
