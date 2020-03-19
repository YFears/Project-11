class Api {
    constructor(options) {
        this.options = options;
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'GET',
            headers: this.options.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject())
    }

    getUserData() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.options.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject())
    }

    setUserData(name = 'Yury Firsau', about = 'Devil') {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject())
    }

    addCard(cardName, cardLlink) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLlink
            })
        })
    }

    deleteCard(cardId) {
        return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.options.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject())
    }

    likeCard(cardId, check) {
        if (check) {
            return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
                method: 'PUT',
                headers: this.options.headers
            })
                .then(res => res.ok ? res.json() : Promise.reject())
        } else {
            return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
                method: 'DELETE',
                headers: this.options.headers
            })
                .then(res => res.ok ? res.json() : Promise.reject())
        }
    }

    updateAvatar(avatar) {
        return fetch(`${this.options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject())
    }

}