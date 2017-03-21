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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  //import
  const Modal = window.Modal;
  const Chat = window.Chat;
  const Form = window.Form;
  const Wrapper = window.Wrapper;
  const User = window.User;

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
      this.wrapper = new Wrapper();
      this.user = new User();
      this.modal = new Modal();
      
      this.__modalForm = document.body.querySelector(".modal-login");
      this.__modalUsername = this.__modalForm.querySelector(".modal-login__input");
      
      this.__modalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.user.username = this.__modalUsername.value;
        
        this.chat = new Chat({
          el: document.createElement("div")
        });
                
        this.form = new Form();
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
})();

/***/ })
/******/ ]);