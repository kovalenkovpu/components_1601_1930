(function() {
  "use strict";
  
  //import
  const user_pug = window.user_tmp;
  
  class User {
    constructor() {
      this.username = this._getName();
      this.avatar = this._getAvatarImg();

      this.chatEl = document.querySelector(".chat-header");
      
      this._createAvatar(this);
      
      this._userLogin();
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
      let tempName = prompt("Введите имя пользователя");

      return (tempName || "Anonim");
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
     * @private
     */
    _userLogin() {
      let loginForm = this.chatEl.querySelector(".user-login"),
          loginInput = this.chatEl.querySelector(".user-login__input"),
          userName = this.chatEl.querySelector(".user-name");
      
      if (this.username == "Anonim") {
        loginForm.addEventListener("submit", (event) => {
          let newName = document.getElementById("user-login__input").value;
          
          event.preventDefault();
          loginInput.setAttribute("disabled", "disabled");
          loginInput.value = "Вы вошли как:";
          this.username = newName;
          userName.textContent = newName;
        });
      } else {
        loginInput.setAttribute("disabled", "disabled");
        loginInput.setAttribute("value", "Вы вошли как:");
      }
    }
  }
  
  //export
  window.User = User;
})();