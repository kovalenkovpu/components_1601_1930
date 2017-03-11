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
	  this._renderComponents();
      this._initMediate();
	}
    
    /**
    * Создание компонент: обертка, чат, форма
    */
	_createComponents() {
      this.wrapper = new Wrapper();
      
      this.chat = new Chat({
	  	el: document.createElement('div')
	  });
         
	  this.form = new Form({
	  	el: document.createElement('div')
	  });
      
      this.user = new User();
	}
    
    /**
    * Рендер компонент
    */
    _renderComponents() {
      this.wrapper.el.appendChild(this.chat.el);
	  this.wrapper.el.appendChild(this.form.el);
    }
    
    /**
    * Логика работы между компонентами
    */
	_initMediate() {
	  this.form.onSubmit( () => {
        let data = this.form.getData(this.user);
        this.chat.addMessage(data);
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