const chat_pug = window.chat_tmp;
import ChatNetService from "../../net_modules/chatService.js";

/**
* @typedef {Object} ChatMessage
* @property {string} text - Текст сообщения
* @property {string} email - Email отправителя сообщения
*/
class Chat {
  constructor(options) {
    this.netService = new ChatNetService("https://kovalenkovpu.firebaseio.com/messages.json");
    
    this.el = options.el;
    
    this.el.classList.add("chat");
    
    this._renderChat(this.el);
    this.netService.pollingDatabase(this._reloadChat);
    this._scrollingChatDown();
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
      let chat = document.body.querySelector(".chat");
      
      chat.innerHTML += chat_pug(data);
      //отправляет сообщение в БД
      this.netService.sendMessageXHR(data);
      chat.scrollTop = chat.scrollHeight;
    }
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
  }
  
  /**
   * Отматывает чат вниз
   * @private
   */
  _scrollingChatDown() {
    window.onload = () => {
      let chat = document.body.querySelector(".chat");
      
      chat.scrollTop = chat.scrollHeight;
    }
  }
}

//export
export default Chat;