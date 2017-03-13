(function () {
  'use strict';
  
  //import
  const form_pug = window.form_tmp;
    
  class Form {
	constructor(options) {
      this.el = document.querySelector(".chat-wrapper");
      
      this.el.innerHTML += form_pug();
          
      this.formNode = this._createFormComponents();
      
      this._initEvents();
	}
	
    /**
    * Получение объекта с ключами - DOM-элементами формы
    * @param {}
    * @returns {object} ключи - DOM-элементы формы
    */
    _createFormComponents() {
      return {
        form: this.el.querySelector(".form"),
        fieldset: this.el.querySelector(".fieldset"),
        textarea: this.el.querySelector("textarea"),
        input: this.el.querySelector(".button")
      }
    }
    
    _initEvents() {
      this.formNode.form.addEventListener('submit',
                                          this._onSubmit.bind(this));
      
      /*this.formNode.form.addEventListener('keydown', (event) => {
        if (event.shiftKey && event.keyCode==13) {
          this._onSubmit.bind(this);
        }
      });*/
    }
    
    _onSubmit(event) {
      event.preventDefault();
      //let formData = this.getData(window.User);

      this.trigger('message'); //создаем обраб. CustomEvent 'message'
      
      //костыль для shift+enter
      this.trigger('click'); //создаем обраб. CustomEvent 'shiftEnter'
    }
    
    /**
    * Замена addEventListener() на on()
    * @param {string} name - имя обработчика
    * @param {function} cb - callback
    */
    on(name, cb) {
      this.formNode.form.addEventListener(name, cb);
    }
    
    /**
    * Метод для создания кастомного обработчика
    * @param {string} name - имя обработчика
    * @param {Object} data - объект с данными пользователя
    * @returns {} запускает обработчик
    */
    trigger(name) {
      let event = new CustomEvent(name);
      
      this.formNode.form.dispatchEvent(event);
    }
    
    /**
    * Получить данные о пользователе, сообщении и времени отправки
    * @param {class} user
    * @returns {object}
    */
    getData(user) {
      let temp_text = this.formNode.textarea.value,
          text = temp_text.replace(/\n/g, "<br/>");
      
      return {
        avatar: user.avatar,
        message: text,
        username: user.username,
        submitted: this._getDate()
      };
    }
    
    /**
    * Очистка текстового поля ввода сообщения
    */
    clearTextarea() {
      this.formNode.textarea.value = null;
    }
    
    /**
    * Получить данные о времени отправки в формате locale
    * @returns {string}
    */
    _getDate() {
      let options = {hour: "2-digit", minute: "2-digit", second: "2-digit"};
      let date = new Date();
      
      return date.toLocaleString("ru", options);
    }
  }

  //export
  window.Form = Form;
})();