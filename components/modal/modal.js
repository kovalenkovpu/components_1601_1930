(function() {
  "use strict";
  
  //import
  const modal_pug = window.modal_tmp;
  
  class Modal {
    constructor() {
      document.body.innerHTML += modal_pug();
      this._initEvents();
    }
    
    _initEvents() {
      let modalWindow = document.body.querySelector(".modal"),
          modal = modalWindow.querySelector(".modal-login"),
          wrapper = document.body.querySelector(".chat-wrapper"),
          modalInput = modalWindow.querySelector(".modal-login__input");
      
      modal.addEventListener("submit", (event) => {
        event.preventDefault();
        
        wrapper.style.opacity = "1";
        modalWindow.style.display = "none";
        
        this.__username = modalInput.value;
      });
    }
    
    getModalUsername() {
      console.log(this.__username);
      return this.__username;
    }
  }
  
  //export
  window.Modal = Modal;
})();