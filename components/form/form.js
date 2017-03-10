(function () {
  'use strict';

  class Form {
	constructor(options) {
      this.el = options.el;
      
      this.formNode = this._formElemsCreate();
      
      this._inits();
	}
	
    _formElemsCreate() {
      return {
        form: document.createElement("form"),
        fieldset: document.createElement("fieldset"),
        textarea: document.createElement("textarea"),
        input: document.createElement("input")
      }
    }
    
    _setElemsAtts() {
      this.formNode.form.classList.add("form");
      this.formNode.fieldset.classList.add("fieldset");
      
      this.formNode.textarea.setAttribute("id", "commentField");
      this.formNode.textarea.setAttribute("placeholder", "Введите сообщение");
      
      this.formNode.input.classList.add("button");
      this.formNode.input.setAttribute("type", "submit");
      this.formNode.input.setAttribute("value", "Send");
      //this.formNode.input.textContent = "Send";
    }
    
    _formCreate() {
      this.el.appendChild(this.formNode.form);
      
      this.formNode.form.appendChild(this.formNode.fieldset);
      
      //this.formNode.fieldset.appendChild(this.formNode.label);
      this.formNode.fieldset.appendChild(this.formNode.textarea);
      this.formNode.fieldset.appendChild(this.formNode.input);
     }
    
    _inits() {
      this._setElemsAtts();
      this._formCreate();
    }
    
    /**
    * Навешивает обработчик при отправке
    * @param {function} callback на выполнение обработчика
    */
	onSubmit(cb) {
      this.formNode.input.addEventListener("click", (event) => {
        event.preventDefault();
        cb();
        this._clearTextarea.call(this);
      });
      
     this.formNode.textarea.addEventListener("keypress", (event) => {
        if(event.shiftKey &&
           event.keyCode==13 &&
           this.formNode.textarea.value)) {
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
          text = temp_text.replace(/\n/g, "<br />");
      
      return {
        avatar: "http://i.imgur.com/nGmyY7w.jpg",
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