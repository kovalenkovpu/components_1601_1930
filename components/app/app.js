//import
import Modal from "../modal/modal.js";
import Chat from "../chat/chat.js";
import Form from "../form/form.js";
import Wrapper from "../chat-wrapper/wrapper.js";
import User from "../user/user.js";

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

     this.form.on("message", () => {
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
