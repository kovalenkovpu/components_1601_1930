(function () {
  'use strict';
    
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
    addMessage(data) {
      if (data.message) {
        this.el.innerHTML +=
          `<div class="message">
            <img class="message__avatar" src=${data.avatar}/>
            <div class="message__time">${data.submitted}</div>
            <div class="message__decor"></div>
            <div class="message__text">
              <div class="message__username">${data.username}</div>
              <div class="message__data">${data.message}</div>
            </div>
          </div>`;

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