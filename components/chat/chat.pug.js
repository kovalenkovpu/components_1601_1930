function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function chat_tmp(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"components\u002Fchat\u002Fchat.pug":"- var arrow = '\u003C?xml version=\"1.0\" encoding=\"utf-8\"?\u003E\u003C!DOCTYPE svg PUBLIC \"-\u002F\u002FW3C\u002F\u002FDTD SVG 1.1\u002F\u002FEN\" \"http:\u002F\u002Fwww.w3.org\u002FGraphics\u002FSVG\u002F1.1\u002FDTD\u002Fsvg11.dtd\"\u003E\u003Csvg class=\"message__arrow-svg\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" xmlns:xlink=\"http:\u002F\u002Fwww.w3.org\u002F1999\u002Fxlink\" version=\"1.1\" height=\"20px\" width=\"20px\" viewBox=\"0 0 16 16\"\u003E\u003Cpath d=\"M16 8c0-5-4.9-5-4.9-5h-5.1v-3l-6 6 6 6v-3h5.2c3.5 0 1.8 7 1.8 7s3-4.1 3-8z\"\u002F\u003E\u003C\u002Fsvg\u003E';\r\n\r\ndiv.message\r\n  img(class='message__avatar' src=`${avatar}`)\r\n  div.message__time #{submitted}\r\n  div.message__text\r\n    div.message__username #{username}\r\n    span.message__arrow !{arrow}\r\n    div.message__data !{message}"};
;var locals_for_with = (locals || {});(function (avatar, message, submitted, username) {;pug_debug_line = 1;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
var arrow = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="message__arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="20px" width="20px" viewBox="0 0 16 16"><path d="M16 8c0-5-4.9-5-4.9-5h-5.1v-3l-6 6 6 6v-3h5.2c3.5 0 1.8 7 1.8 7s3-4.1 3-8z"/></svg>';
;pug_debug_line = 3;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"message\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"message__avatar\""+pug_attr("src", `${avatar}`, true, false)) + "\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"message__time\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = submitted) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"message__text\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"message__username\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = username) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + "\u003Cspan class=\"message__arrow\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + (null == (pug_interp = arrow) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 9;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"message__data\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "components\u002Fchat\u002Fchat.pug";
pug_html = pug_html + (null == (pug_interp = message) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"avatar" in locals_for_with?locals_for_with.avatar:typeof avatar!=="undefined"?avatar:undefined,"message" in locals_for_with?locals_for_with.message:typeof message!=="undefined"?message:undefined,"submitted" in locals_for_with?locals_for_with.submitted:typeof submitted!=="undefined"?submitted:undefined,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}