(function () {
  'use strict';

  //import
  const Chat = window.Chat;
  const Form = window.Form;
  const Wrapper = window.Wrapper;
  const User = window.User;
    
  class App {
    constructor(options) {
	  this.el = options.el; 
         
	  this._createComponents();
	  //this._renderComponents();
      this._initMediate();
	}
    
    /**
    * Создание и рендер компонент: обертка, чат, форма, юзер
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
    */
	_initMediate() {
      this.form.on("message", (event) => {
        //let formData = event.detail;
        let formData = this.form.getData();
      
        this.chat.addMessage(formData, this.user);
        this.form.clearTextarea();
	  });
      
      /**
      * Костыль, добавляющий возможность отправлять сообщение
      * не по сабмиту формы, а по SHIFT+ENTER
      */
      this.form.on("click", (event) => {
        if (event.target.tagName == "TEXTAREA") {
          event.target.addEventListener("keydown", (event) => {
            if (event.shiftKey &&
                event.keyCode==13) {
              let formData = this.form.getData();
              
              event.preventDefault();
              this.chat.addMessage(formData, this.user);
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
	
    // methods
  }

	//export
	window.App = App;
})();