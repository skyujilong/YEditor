'use strict';
var domUtil = require('../mods/ui/editor/util/domUtil');
if(!console || !console.log){
    window.console = {
        log: function(text){
            alert(text);
        }
    }
}
var d1Dom = domUtil.$('#d1');
console.log(d1Dom);
var d2Dom = domUtil.$('#d2');
console.log(d2Dom);

console.log(domUtil.$('span')[0].childNodes);
domUtil.text(domUtil.$('span')[0],'wo cao zheshi ceshi');