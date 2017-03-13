(function () {
  'use strict';
  
  const chat_pug = window.chat_tmp;
  
  /**
  * @typedef {Object} ChatMessage
  * @property {string} text - Текст сообщения
  * @property {string} email - Email отправителя сообщения
  */

  class Chat {
    constructor(options) {
      this.el = options.el;
      this.el.classList.add("chat");
      
      this._renderChat(this.el);
    }
    
    _renderChat(elem) {
      let wrapper = document.querySelector(".chat-wrapper");
      
      wrapper.appendChild(elem);
    }
    
    /**
    * Добавить новое сообщение в чат
    * @param {ChatMessage} data
    */
    addMessage(data, userData) {
      if (data.message) {
        let chat = document.querySelector(".chat");

        data.username = userData.username;
        data.avatar = userData.avatar;

        chat.innerHTML += window.chat_tmp(data);
        chat.scrollTop = chat.scrollHeight;
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