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
export default Modal;