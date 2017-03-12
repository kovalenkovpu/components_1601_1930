(function() {
  "use strict";
  
  //import
  const user_tmp = window.user_tmp;
  
  class User {
    constructor() {
      this.username = this._getName();
      this.avatar = "http://i.imgur.com/qktCpaO.jpg";
            
      this.chatEl = document.querySelector(".chat-header");
      
      this._createAvatar(this);
    }
    
    _createAvatar(object) {
      let avatar = window.user_tmp(object);
      
      this.chatEl.innerHTML += avatar;
    }
    
    _getName() {
      let tempName = prompt("Введите имя пользователя");
            
      return (tempName || "Anon");
    }
  }
  
  //export
  window.User = User;
})();