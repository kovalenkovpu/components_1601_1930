function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function modal_tmp(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"components\u002Fmodal\u002Fmodal.pug":"section.modal\r\n  p.modal-info Введите имя и нажмите ENTER\r\n  form.modal-login\r\n    fieldset.modal-login__fieldset\r\n      input(id='modal-login__input' class='modal-login__input' type='text' placeholder='Войти')"};
;pug_debug_line = 1;pug_debug_filename = "components\u002Fmodal\u002Fmodal.pug";
pug_html = pug_html + "\u003Csection class=\"modal\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "components\u002Fmodal\u002Fmodal.pug";
pug_html = pug_html + "\u003Cp class=\"modal-info\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "components\u002Fmodal\u002Fmodal.pug";
pug_html = pug_html + "Введите имя и нажмите ENTER\u003C\u002Fp\u003E";
;pug_debug_line = 3;pug_debug_filename = "components\u002Fmodal\u002Fmodal.pug";
pug_html = pug_html + "\u003Cform class=\"modal-login\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "components\u002Fmodal\u002Fmodal.pug";
pug_html = pug_html + "\u003Cfieldset class=\"modal-login__fieldset\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "components\u002Fmodal\u002Fmodal.pug";
pug_html = pug_html + "\u003Cinput class=\"modal-login__input\" id=\"modal-login__input\" type=\"text\" placeholder=\"Войти\"\u002F\u003E\u003C\u002Ffieldset\u003E\u003C\u002Fform\u003E\u003C\u002Fsection\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}