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
    
  /**
   * Инит обработчика на форму
   * @private
   */
  _initEvents() {
    let hint = this.formNode.form.querySelector(".form__commentfield-hint");
    
    this.formNode.form.addEventListener("submit",
                                        this._onSubmit.bind(this));
    
    this.formNode.textarea.addEventListener("keydown", (event) => {
      if (event.shiftKey && event.keyCode == 13) {
        event.preventDefault();

        this.trigger("message");
      }
    });
    
    this.formNode.textarea.addEventListener("focus", (event) => {
      if (!this.formNode.form.querySelector(".form__commentfield-hint--visible")) {
        hint.classList.add("form__commentfield-hint--visible");
      }
    });
    
    this.formNode.textarea.addEventListener("blur", (event) => {
      if (this.formNode.form.querySelector(".form__commentfield-hint--visible")) {
        hint.classList.remove("form__commentfield-hint--visible");
      }
    });
  }
    
  /**
   * Запускается при ините _initEvents()
   * @private
   * @param {string} event
   */
  _onSubmit(event) {
    event.preventDefault();

    this.trigger('message'); //создаем обраб. CustomEvent 'message'
  }
 
  /**
   * Замена addEventListener() на on()
   * @param {string}   name - имя обработчика
   * @param {function} cb   - callback
   */
  on(name, cb) {
    this.formNode.form.addEventListener(name, cb);
  }
  
  /**
   * Метод для создания кастомного обработчика
   * @param {string} name - имя обработчика
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
      submitted: user.date || this._getDate()
    };
  }
  
  /**
   * Отправляет имя юзера в поле ввода формы при
   * клике на стрелку ответа, ставит автофокус
   * @param {object} target DOM-элемент - имя юзера,
   *                        которому уходит ответ
   */
  replyToUser(target) {
    let replyName = target.parentNode.querySelector(".message__username").textContent;
    
    this.formNode.textarea.value += "@" + replyName + " ";
    this.formNode.textarea.focus();
  }
  
  /**
   * Очистка текстового поля ввода сообщения
   */
  clearTextarea() {
    this.formNode.textarea.value = null;
  }
    
  /**
   * Получить данные о времени отправки в формате locale
   * @private
   * @returns {string} - время в формате HH:MM:SS
   */
  _getDate() {
    let options = {hour: "2-digit", minute: "2-digit", second: "2-digit"};
    let date = new Date();
    
    return date.toLocaleString("ru", options);
  }
}

//export
export default Form;