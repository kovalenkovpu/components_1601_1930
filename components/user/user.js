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
        
        (count == 0) ? 1 : count;

        return "http://lorempixel.com/50/50/people/" + count;
      }
    }
  }
  
  //export
  window.User = User;
})();