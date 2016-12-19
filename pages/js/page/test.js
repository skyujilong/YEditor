'use strict';
var range = document.createRange();

var referenceNode = document.getElementsByTagName("div").item(0);
range.selectNode(referenceNode);
console.log(range.collapsed);
range.collapse(true);
console.log(range.collapsed);
