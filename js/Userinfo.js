class Userinfo {    
    constructor(name, pro, popupName, popupPro) {
        this.name = name;
        this.pro = pro;
        this.popupName = popupName;
        this.popupPro = popupPro;
        this.setUserInfo();
    };

    setUserInfo() {
        this.name.value = this.popupName.textContent;
        this.pro.value = this.popupPro.textContent;
    };

    updateUserInfo() {
        this.popupName.textContent = this.name.value;
        this.popupPro.textContent = this.pro.value;
    };
}
