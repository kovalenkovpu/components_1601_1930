//import
const user_pug = window.user_tmp;

class User {
  constructor() {
    this.username = this._getName();
    this.avatar = this._getAvatarImg();

    this.chatEl = document.querySelector(".chat-header");
    
    this._createAvatar(this);
  }
  
  /**
   * Создаем иконку аватар в хэдере чата
   * @private
   * @param {object} object - объект юзер
   */
  _createAvatar(object) {
    let avatar = user_pug(object);
    
    this.chatEl.innerHTML += avatar;
  }
  
  /**
   * Получение имени пользователя
   * @private
   * @returns {string} - имя
   */
  _getName() {      
    return "Anonim";
  }
  
  /**
   * Получение аватара пользователя
   * @private
   * @returns {string} - имя
   */
  _getAvatarImg() {
    if (this.username == "Admin") {
      return "http://i.imgur.com/qktCpaO.jpg";
    } else {      
      let count = Math.round(Math.random() * 10);
      //0 == random, поэтому следим и меняем
      count == 0 ? count = 1 : count;

      return "http://lorempixel.com/50/50/people/" + count;
    }
  }
  
  /**
   * Обрабатывает авторизацию пользователя
   */
  userCheckLogin() {
    let header = document.querySelector(".chat-header"),
        loginInput = header.querySelector(".user-login__input"),
        userName = header.querySelector(".user-name");
    
    loginInput.setAttribute("disabled", "disabled");
    loginInput.setAttribute("value", "Вы вошли как:");
    userName.textContent = this.username;
  }
}

//export
export default User;