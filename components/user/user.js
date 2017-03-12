(function() {
  "use strict";
  
  //import
  const user_tmp = window.user_tmp;
  
  class User {
    constructor() {
      this.name = this._getName();
      
      this.chatEl = document.querySelector(".chat-header");
    }
    
    _createAvatar() {
      let avatar = window.user_tmp();
      
      this.chatEl.appendChild();
    }
    
    _getName() {
    //let tempName = prompt("Введите имя пользователя");
      let tempName = "Pavel";
      if (tempName === null) return "Anon";
      return tempName;
    }
  }
  
  //export
  window.User = User;
})();