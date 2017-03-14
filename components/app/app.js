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
  function makeRequest (cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/kovalenkovpu/components_1601_1930/master/data/data.json');
    xhr.send();
    xhr.onload = function() {
      cb(JSON.parse(xhr.responseText));
    }
  }

  class App {
    constructor(options) {
	  this.el = options.el;
      
      makeRequest((data) => {
        this.jsonData = data;
        this._createComponents();
        this._initMediate();
      });
	}
    
    /**
      * Создание и рендер компонент: обертка, чат, форма, юзер
      * @private
      */
	_createComponents() {
      this.wrapper = new Wrapper();
      
      this.chat = new Chat({
	  	el: document.createElement('div')
	  }, this.jsonData);
         
	  this.form = new Form();
            
      this.user = new User();
	}

    /**
      * Логика работы между компонентами
      * @private
      */
	_initMediate() {
      this.form.on("message", (event) => {
        //let formData = event.detail;
        let formData = this.form.getData(this.user);
      
        this.chat.addMessage(formData);
        this.form.clearTextarea();
	  });

	  this.chat.onScrollStart(() => {
	  	this.form.disable();
	  });
         
	  this.chat.onScrollEnd(() => {
	  	this.form.enable();
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