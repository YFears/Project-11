export class Card {
    constructor(data) {
        this.placeCard = this.create(data);
    }

    create(data) {
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('beforeend', `<div class="place-card" id=${data._id}>
        <div class="place-card__image" style="background-image: url(${data.link})">
         <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name">${data.name}</h3>
            <div>
                <button class="place-card__like-icon"></button>
                <div class="place-card__likes"></div>
            </div>
        </div>
       </div>`);       
        return wrapper.firstChild;
    }
}
