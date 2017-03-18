(function() {
  "use strict";
  
  class ChatNetService {
    constructor(url) {
      this.url = url;
    }

    /**
     * Отправляет сообщение в БД
     * @private
     * @param {object} data - объект данных сообщения
     */
    _sendMessageXHR(data) {
      let xhr = new XMLHttpRequest();
      
      xhr.open('POST', this.url, true);
      
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
      
      xhr.open('GET', this.url, true);
      
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
    _pollingDatabase(reloadCallback) {
      this._getMessagesXHR((data) => {
        reloadCallback(data);
      });
      
      this.__pollingID = setInterval(() => {
        this._getMessagesXHR((data) => {
          
          if (data == null) {
            return;
          }

          if (!this._isEqual(data, this._retrieveLastChatMessage())) {
            let chat = document.querySelector(".chat");
            
            reloadCallback(data);
            chat.scrollTop = chat.scrollHeight;
          }

        });
      }, 1000);
    }
    
    /**
     * Сравнение последнего сообщения в чате с последним сообщением
     * в БД по ключам
     * @private
     * @param   {object} serverObj история чата с сервера
     * @param   {object}   clientObj последнее сообщение чата
     * @returns {boolean}  true если равны
     */
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
    
    /**
     * Получает последнее сообщение из чата (не из БД)
     * @private
     * @returns {object} объект с данными последнего сообщ чата
     */
    _retrieveLastChatMessage() {
      let message = document.body.querySelector(".chat").lastChild;

      return {
        avatar: message.querySelector(".message__avatar").getAttribute("src"),
        message: "",
        username: message.querySelector(".message__username").textContent,
        submitted: message.querySelector(".message__time").textContent
      }
    }
    
  }
  
  //export
  window.ChatNetService = ChatNetService;
})();