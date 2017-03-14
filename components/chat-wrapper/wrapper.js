(function() {
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
  window.Wrapper = Wrapper;
})();