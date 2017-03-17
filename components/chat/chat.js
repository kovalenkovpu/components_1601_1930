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
      //this.data = this._getMessagesXHR();
      this.el = options.el;
      
      this.el.classList.add("chat");
      
      this._renderChat(this.el);

      this._pollingDatabase();
    }
    
    /**
     * Рендер элементов текстового поля чата
     * @private
     * @param {object} elem DOM-элемент
     */
    _renderChat(elem) {
      let wrapper = document.querySelector(".chat-wrapper");
      
      wrapper.appendChild(elem);
      this._reloadChat(this.data);
    }
        
    /**
     * Добавить новое сообщение в чат
     * @param {ChatMessage} data
     */
    addMessage(data) {
      if (data.message) {
        let chat = document.querySelector(".chat");
        
        chat.innerHTML += chat_pug(data);
        //отправляет сообщение в БД
        this._sendMessageXHR(data);
        chat.scrollTop = chat.scrollHeight;
      }
    }
    
    /**
     * Отправляет сообщение в БД
     * @private
     * @param {object} data - объект данных сообщения
     */
    _sendMessageXHR(data) {
      let xhr = new XMLHttpRequest();
      
      xhr.open('POST', 'https://kovalenkovpu.firebaseio.com/messages.json', true);
      
      xhr.onload = function() {
        console.log("Данные отправлены");
      }
      
      xhr.send(JSON.stringify(data));
    }
    
    /**
     * Получает данные с сервера
     * @private
     * @returns {object} - объект данных по сообщениям
     */
    _getMessagesXHR(cb) {
      let xhr = new XMLHttpRequest();
      
      xhr.open('GET', 'https://kovalenkovpu.firebaseio.com/messages.json', true);
      
      xhr.onload = function() {
        //аргумент cb - это объект вида {{...},{...},{...}}
        cb(JSON.parse(xhr.responseText));
      }

      xhr.send();
    }
    
    /**
     * Запускает опрос сервера
     * @private
     */
    _pollingDatabase() {
      this._getMessagesXHR((data) => {
        this._reloadChat(data);
      });
      
      this.__pollingID = setInterval(() => {
        this._getMessagesXHR((data) => {
          
          if (data == null) {
            return;
          }

          if (!this._isEqual(data, this._retrieveLastChatMessage())) this._reloadChat(data);

        });
      }, 1000);
    }
    
    _isEqual(serverObj, clientObj) {
      let keysArr = Object.keys(serverObj),
          target = serverObj[keysArr[keysArr.length - 1]];
      
      let serverAvatar = target.avatar,
          clientAvatar = clientObj.avatar,
          serverUsername = target.username,
          clientUsername = clientObj.username,
          serverSubmitted = target.submitted,
          clientSubmitted = clientObj.submitted;
      
      if (serverAvatar === clientAvatar &&
          serverUsername === clientUsername &&
          serverSubmitted === clientSubmitted) return true;
    }
    
    _retrieveLastChatMessage() {
      let message = document.body.querySelector(".chat").lastChild;

      return {
        avatar: message.querySelector(".message__avatar").getAttribute("src"),
        message: "",
        username: message.querySelector(".message__username").textContent,
        submitted: message.querySelector(".message__time").textContent
      }
    }
    
    /**
     * Останавливает опрос сервера
     */
    stopPollingDatabase() {
      clearInterval(this.__pollingID)
    }
    
    /**
     * Перезагрузка чата
     * @private
     * @param {object} data - данные от _getMessagesXHR
     */
    _reloadChat(data) {
      let chat = document.body.querySelector(".chat");
      
      chat.innerHTML = "";
      
      for (let key in data) {
        chat.innerHTML += chat_pug(data[key]);
      }
      /*data.forEach((elem) => {
          chat.innerHTML += chat_pug(elem);
      });*/
    }
  }
  
  //export
  window.Chat = Chat;
})();