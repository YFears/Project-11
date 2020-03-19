class FormValidator {
    constructor(form, tipName, tipLink, popupButton) {
        this.form = form;
        this.tipName = tipName;
        this.tipLink = tipLink;
        this.popupButton = popupButton;
    }
    checkInputValidity(field, tip) {
        if (field === '') {
            tip.textContent = 'Обязательное поле';
        } else if (field.length < 2 || field.length > 30) {
            tip.textContent = 'Должно быть от 2 до 30 символов';
        } else {
            tip.textContent = '';
            return true;
        }
    }

    checkInputValidityLink(placeLink, tip) {
        const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        const regex = new RegExp(expression);
        if (!placeLink.match(regex)) {
            tip.textContent = 'Здесь должна быть ссыллка';
        } else {
            tip.textContent = '';
            return true;
        }
    }

    setSubmitButtonState() {
        const firstRule = this.checkInputValidity(this.form.elements.name.value, this.tipName);
        const secondRule = this.checkInputValidity(this.form.elements.link.value, this.tipLink);
        if (firstRule && secondRule) {
            this.trueForm();
        } else {
            this.falseForm();
        }
    }

    setSubmitButtonStatePlace() {
        const firstRule = this.checkInputValidity(this.form.elements.name.value, this.tipName);
        const secondRule = this.checkInputValidityLink(this.form.elements.link.value, this.tipLink);
        if (firstRule && secondRule) {
            this.trueForm();
        } else {
            this.falseForm();
        }
    }
    setSubmitButtonStateAvatar() {
        const secondRule = this.checkInputValidityLink(this.form.elements.link.value, this.tipLink);
        if (secondRule) {
            this.trueForm();
        } else {
            this.falseForm();
        }
    }

    setEventListeners() {
        this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
        this.setSubmitButtonState();
    }
    trueForm() {
        this.popupButton.setAttribute('style', 'background: #000000; color: #FFFFFF');
        this.popupButton.removeAttribute('disabled');
    }
    falseForm() {
        this.popupButton.setAttribute('style', 'background: transparent; color: rgba(0, 0, 0, .2)');
        this.popupButton.setAttribute('disabled', 'disabled');
        this.popupButton.setAttribute('disabled', '');
    }

    render() {
        this.form.elements.name.value = '';
        this.form.elements.link.value = '';
        this.tipName.textContent = '';
        this.tipLink.textContent = '';
    }
    renderUser() {
        this.tipName.textContent = '';
        this.tipLink.textContent = '';
    }
    renderAva() {
        this.form.elements.link.value = '';
        this.tipLink.textContent = '';
    }
}
