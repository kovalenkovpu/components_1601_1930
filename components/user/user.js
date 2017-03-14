(function() {
  "use strict";
  
  //import
  const user_pug = window.user_tmp;
  
  class User {
    constructor() {
      this.username = this._getName();
      this.avatar = "http://i.imgur.com/qktCpaO.jpg";
            
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
            
      return (tempName || "Anon");
    }
  }
  
  //export
  window.User = User;
})();