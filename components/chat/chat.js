(function () {
  'use strict';
  
  const tmp = window.chat_tmp;
  
  /**
  * @typedef {Object} ChatMessage
  * @property {string} text - Текст сообщения
  * @property {string} email - Email отправителя сообщения
  */

  class Chat {
    constructor(options) {
      this.el = options.el;
      this.el.classList.add("chat");
    }
    
    /**
    * Добавить новое сообщение в чат
    * @param {ChatMessage} data
    */
    addMessage(data, userData) {
      if (data.message) {
        data.username = userData.username;
        data.avatar = userData.avatar;
        console.log(data.name, data.avatar);
        
        this.el.innerHTML += window.chat_tmp(data);
        this.el.scrollTop = this.el.scrollHeight;
      }
    }
    
    onScrollStart(cb) {
      
    }
    
    onScrollEnd(cb) {
      
    }
    
    // methods
  }
  
  //export
  window.Chat = Chat;
})();