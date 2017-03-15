(function () {
  'use strict';
  
  const chat_pug = window.chat_tmp;
  
  /**
  * @typedef {Object} ChatMessage
  * @property {string} text - Текст сообщения
  * @property {string} email - Email отправителя сообщения
  */

  class Chat {
    constructor(options, dataArr) {
      this.data = dataArr;
      this.el = options.el;
      this.el.classList.add("chat");
      
      this._renderChat(this.el);
    }
    
    /**
     * Рендер элементов текстового поля чата
     * @private
     * @param {object} elem DOM-элемент
     */
    _renderChat(elem) {
      let wrapper = document.querySelector(".chat-wrapper");
      
      wrapper.appendChild(elem);
      this._getStory(this.data);
    }
    
    /**
     * Добавить новое сообщение в чат
     * @param {ChatMessage} data
     */
    addMessage(data) {
      if (data.message) {
        let chat = document.querySelector(".chat");
        
        //[-]TODO - добавлять информацию в data.json
        //[+]TODO - учесть переносы на новую строку
        //[+]TODO - подсказки
        //[-]TODO - реализовать reply
        
        chat.innerHTML += chat_pug(data);
        chat.scrollTop = chat.scrollHeight;
        
        //this._onArrowEventListener();
      }
    }
    
    /*_onArrowEventListener() {
      
      mentionArrow.addEventListener("click", () => {
        textarea += "BACK TO: ";
      });
    }*/
    
    /**
     * Добавляет историю в чат при первом запуске
     * @private
     * @param {array} dataArr - массив объектов с данными
     */
    _getStory(dataArr) {
      if (dataArr.length) {
        let chat = document.querySelector(".chat");
        
        dataArr.forEach((elem) => {
          chat.innerHTML += chat_pug(elem);
        });
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