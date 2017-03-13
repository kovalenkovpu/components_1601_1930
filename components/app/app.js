(function () {
  'use strict';

  //import
  const Chat = window.Chat;
  const Form = window.Form;
  const Wrapper = window.Wrapper;
  const User = window.User;
  
  function makeRequest (cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/components/data/data.json');
    
    xhr.onload = () => {
      console.log('onload DATA:', JSON.parse(xhr.responseText));
      cb(JSON.parse(xhr.responseText));
    }
    
    xhr.send();
  }
    
  class App {
    constructor(options) {
	  this.el = options.el;
      
      makeRequest((data) => {
        this.jsonData = data;
        this._createComponents(); //чат, форма
      });
      
      //this._createComponents();
      this._initMediate();
	}
    
    /**
    * Создание и рендер компонент: обертка, чат, форма, юзер
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
    */
	_initMediate() {
      this.form.on("message", (event) => {
        //let formData = event.detail;
        let formData = this.form.getData(this.user);
      
        this.chat.addMessage(formData);
        this.form.clearTextarea();
	  });
      
      
      // Костыль, добавляющий возможность отправлять сообщение
      // не по сабмиту формы, а по SHIFT+ENTER
      this.form.on("click", (event) => {
        if (event.target.tagName == "TEXTAREA") {
          event.target.addEventListener("keydown", (event) => {
            if (event.shiftKey &&
                event.keyCode==13) {
              let formData = this.form.getData(this.user);
              
              event.preventDefault();
              this.chat.addMessage(formData);
              this.form.clearTextarea();
            }
          });
        }
      });
      
	  this.chat.onScrollStart(() => {
	  	this.form.disable();
	  });
         
	  this.chat.onScrollEnd(() => {
	  	this.form.enable();
	  });
	}
    
    addMessage(data) {
      this.chat.addMessage(data);
    }
  }

	//export
	window.App = App;
})();