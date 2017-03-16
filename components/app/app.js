(function () {
  'use strict';

  //import
  const Chat = window.Chat;
  const Form = window.Form;
  const Wrapper = window.Wrapper;
  const User = window.User;
  
  
  /**
   * Отправляет запрос к data.json, который содержит все
   * сообщения, авторов, даты
   * @param {function} cb - срабатывает при загрузке данных
   */
  /*function makeRequest (cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://kovalenkovpu.firebaseio.com/messages.json', true);
    
    xhr.onload = function() {
      cb(JSON.parse(xhr.responseText));
    }
    
    xhr.send();
  }*/

  class App {
    constructor(options) {
	  this.el = options.el;
      
      /*makeRequest((data) => {
        this.jsonData = data;
        this._createComponents();
        this._initMediate();
      });*/
      
      this._createComponents();
      this._initMediate();
	}
    
    /**
      * Создание и рендер компонент: обертка, чат, форма, юзер
      * @private
      */
	_createComponents() {
      this.wrapper = new Wrapper();
      
      this.chat = new Chat({
	  	el: document.createElement('div')
	  });
         
	  this.form = new Form();
            
      this.user = new User();
	}

    /**
      * Логика работы между компонентами
      * @private
      */
	_initMediate() {
      let chatEl = document.body.querySelector(".chat");
      
      this.form.on("message", (event) => {
        //let formData = event.detail;
        let formData = this.form.getData(this.user);
      
        this.chat.addMessage(formData);
        this.form.clearTextarea();
	  });
      
      chatEl.addEventListener("click", (event) => {
        let closest = event.target.closest(".message__arrow");
        
        if (closest) {
          this.form.replyToUser(closest);
        }
      });
	}
    
    /**
     * Добавляет возможность создания сообщения из глоб области видимости
     * @param {[[Type]]} data [[Description]]
     */
    addMessage(data) {
      this.chat.addMessage(data);
    }
  }

  //export
  window.App = App;
})();