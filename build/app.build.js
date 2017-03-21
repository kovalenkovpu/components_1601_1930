/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const wrapper_pug = window.wrapper_tmp;
  
class Wrapper {
  constructor(options) {
    document.body.innerHTML = wrapper_pug();
    
    this.el = document.body.querySelector(".chat-wrapper");
  }
  
  //устаревший функционал
  /**
   * Добавление хэдера чата
   * @param {object} DOM element
   */
  _createChatHeader(elem) {
    let header = document.createElement("div");
    
    header.classList.add("chat-header");
    header.innerHTML = "<h3>Чат v.0.1.1</h3>";
    elem.appendChild(header);
  }
}
    
//export
/* harmony default export */ __webpack_exports__["a"] = Wrapper;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__net_modules_chatService_js__ = __webpack_require__(5);
const chat_pug = window.chat_tmp;


/**
* @typedef {Object} ChatMessage
* @property {string} text - Текст сообщения
* @property {string} email - Email отправителя сообщения
*/
class Chat {
  constructor(options) {
    this.netService = new __WEBPACK_IMPORTED_MODULE_0__net_modules_chatService_js__["a" /* default */]("https://kovalenkovpu.firebaseio.com/messages.json");
    
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
/* harmony default export */ __webpack_exports__["a"] = Chat;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = Form;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//import
const modal_pug = window.modal_tmp;

class Modal {
  constructor() {
    document.body.innerHTML += modal_pug();
    //this._initEvents();
  }

  /**
   * Убирает модалку при сабмите формы
   * @param {object} modalEl DOM модального окна
   */
  hideModal(modalEl) {
    let wrapper = document.body.querySelector(".chat-wrapper");
    
    wrapper.style.opacity = "1";
    modalEl.style.display = "none";
  }
}

//export
/* harmony default export */ __webpack_exports__["a"] = Modal;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//import
const user_pug = window.user_tmp;

class User {
  constructor() {
    this.username = this._getName();
    this.avatar = this._getAvatarImg();

    this.chatEl = document.querySelector(".chat-header");
    
    this._createAvatar(this);
  }
  
  /**
   * Создаем иконку аватар в хэдере чата
   * @private
   * @param {object} object - объект юзер
   */
  _createAvatar(object) {
    let avatar = user_pug(object);
    
    this.chatEl.innerHTML += avatar;
  }
  
  /**
   * Получение имени пользователя
   * @private
   * @returns {string} - имя
   */
  _getName() {      
    return "Anonim";
  }
  
  /**
   * Получение аватара пользователя
   * @private
   * @returns {string} - имя
   */
  _getAvatarImg() {
    if (this.username == "Admin") {
      return "http://i.imgur.com/qktCpaO.jpg";
    } else {      
      let count = Math.round(Math.random() * 10);
      //0 == random, поэтому следим и меняем
      count == 0 ? count = 1 : count;

      return "http://lorempixel.com/50/50/people/" + count;
    }
  }
  
  /**
   * Обрабатывает авторизацию пользователя
   */
  userCheckLogin() {
    let header = document.querySelector(".chat-header"),
        loginInput = header.querySelector(".user-login__input"),
        userName = header.querySelector(".user-name");
    
    loginInput.setAttribute("disabled", "disabled");
    loginInput.setAttribute("value", "Вы вошли как:");
    userName.textContent = this.username;
  }
}

//export
/* harmony default export */ __webpack_exports__["a"] = User;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ChatNetService {
  constructor(url) {
    this.url = url;
  }

  /**
   * Отправляет сообщение в БД
   * @param {object} data - объект данных сообщения
   */
  sendMessageXHR(data) {
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', this.url, true);
    
    xhr.onload = function() {
      console.log("Данные отправлены");
    }
    
    xhr.send(JSON.stringify(data));
  }
  
  /**
   * Получает данные с сервера
   * @private
   * @returns {object} - объект данных по сообщениям
   */
  _getMessagesXHR(cb) {
    let xhr = new XMLHttpRequest();
    let chat = document.body.querySelector(".chat");
    
    xhr.open('GET', this.url, true);
    
    xhr.onload = function() {
      //аргумент cb - это объект вида {{...},{...},{...}}
      cb(JSON.parse(xhr.responseText));
    }
    xhr.send();
  }
  
  /**
   * Запускает опрос сервера
   * @private
   */
  pollingDatabase(reloadCallback) {
    this._getMessagesXHR((data) => {
      reloadCallback(data);
    });
    
    this.__pollingID = setInterval(() => {
      this._getMessagesXHR((data) => {
        
        if (data == null) {
          return;
        }

        if (!this._isEqual(data, this._retrieveLastChatMessage())) {
          let chat = document.querySelector(".chat");
          
          reloadCallback(data);
          chat.scrollTop = chat.scrollHeight;
        }
      });
    }, 1000);
  }
  
  /**
   * Сравнение последнего сообщения в чате с последним сообщением
   * в БД по ключам
   * @private
   * @param   {object} serverObj история чата с сервера
   * @param   {object}   clientObj последнее сообщение чата
   * @returns {boolean}  true если равны
   */
  _isEqual(serverObj, clientObj) {
    let keysArr = Object.keys(serverObj),
        target = serverObj[keysArr[keysArr.length - 1]];
    
    let serverAvatar = target.avatar,
        clientAvatar = clientObj.avatar,
        serverUsername = target.username,
        clientUsername = clientObj.username,
        serverSubmitted = target.submitted,
        clientSubmitted = clientObj.submitted;
    
    if (serverAvatar === clientAvatar &&
        serverUsername === clientUsername &&
        serverSubmitted === clientSubmitted) return true;
  }
  
  /**
   * Получает последнее сообщение из чата (не из БД)
   * @private
   * @returns {object} объект с данными последнего сообщ чата
   */
  _retrieveLastChatMessage() {
    let message = document.body.querySelector(".chat").lastChild;

    return {
      avatar: message.querySelector(".message__avatar").getAttribute("src"),
      message: "",
      username: message.querySelector(".message__username").textContent,
      submitted: message.querySelector(".message__time").textContent
    }
  }
  
  /**
   * Останавливает опрос сервера
   */
  stopPollingDatabase() {
    clearInterval(this.__pollingID)
  }
}

//export
/* harmony default export */ __webpack_exports__["a"] = ChatNetService;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modal_modal_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_chat_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_form_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_wrapper_wrapper_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user_js__ = __webpack_require__(4);
//import





 
class App {
  constructor(options) {
    this.el = options.el;
    this._createComponents(); 
   }
   
   /**
     * Создание и рендер компонент
     * @private
     */
  _createComponents() {
     this.wrapper = new __WEBPACK_IMPORTED_MODULE_3__chat_wrapper_wrapper_js__["a" /* default */]();
     this.user = new __WEBPACK_IMPORTED_MODULE_4__user_user_js__["a" /* default */]();
     this.modal = new __WEBPACK_IMPORTED_MODULE_0__modal_modal_js__["a" /* default */]();
     
     this.__modalForm = document.body.querySelector(".modal-login");
     this.__modalUsername = this.__modalForm.querySelector(".modal-login__input");
     
     this.__modalForm.addEventListener("submit", (event) => {
       event.preventDefault();
       this.user.username = this.__modalUsername.value;
       
       this.chat = new __WEBPACK_IMPORTED_MODULE_1__chat_chat_js__["a" /* default */]({
         el: document.createElement("div")
       });
               
       this.form = new __WEBPACK_IMPORTED_MODULE_2__form_form_js__["a" /* default */]();
       this._initMediate();
       
       this.modal.hideModal(this.__modalForm);
       this.user.userCheckLogin();
     });
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
}

//export
window.App = App;

/***/ })
/******/ ]);