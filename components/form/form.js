(function () {
  'use strict';
  
  const form_tmp = window.form_tmp;
  
  class Form {
	constructor(options) {
      this.el = options.el;
      
      this.el.innerHTML = window.form_tmp();
          
      this.formNode = this._createFormComponents();
	}
	
    /**
    * Создание компонент формы
    */
    _createFormComponents() {
      return {
        form: this.el.querySelector(".form"),
        fieldset: this.el.querySelector(".fieldset"),
        textarea: this.el.querySelector("textarea"),
        input: this.el.querySelector(".button")
      }
    }
    
    /**
    * Навешивает обработчик при отправке
    * @param {function} callback на выполнение обработчика
    */
	onSubmit(cb) {
      this.formNode.form.addEventListener("submit", (event) => {
        event.preventDefault();
        cb();
        this._clearTextarea.call(this);
      });
      
      this.formNode.textarea.addEventListener("keypress", (event) => {
        if(event.shiftKey &&
           event.keyCode==13 &&
           this.formNode.textarea.value) {
          cb();
          this._clearTextarea.call(this);
        }
      });
	}
    
    /**
    * Получить данные о пользователе, сообщении и времени отправки
    * @param {class}
    * @returns {{string, string, string}}
    */ 
    getData(user) {
      let temp_text = this.formNode.textarea.value,
          text = temp_text.replace(/\n/g, "<br/>");
      
      return {
        avatar: "http://i.imgur.com/qktCpaO.jpg",
        message: text,
        username: user.name,
        submitted: this._getDate()
      };
    }
    
    /**
    * Очистка текстового поля ввода сообщения
    */
    _clearTextarea() {
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