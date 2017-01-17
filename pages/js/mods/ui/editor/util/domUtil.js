'use strict';
var _ = require('lodash/core');
var util = require('./util.js');
var qwery = require('qwery');
//通过DOMUtil DOMUtil.fn.init DOMUtil.prototype 将prototype赋值给
function DOMUtil(selector, context) {
    return new DOMUtil.fn.init(selector, context);
}
DOMUtil.fn = DOMUtil.prototype = {

    constructor: DOMUtil,

    init: function(selector, context) {
        var eleList;
        this.length = 0;
        if(_.isString(selector)){
            this.selector = selector;
            selector = util.trim(selector);
            if (!context) {
                context = window.document;
            }
            eleList = qwery(selector, context);
            this.length = eleList.length;
            _.forEach(eleList,function(ele,index){
                this[index] = ele;
            }.bind(this));
        }else if(_.isObject(selector) && selector.nodeType === this.NODE_TYPE.ELEMENT_NODE){
            this[0] = selector;
            this.length = 1;
        }
        return this;
    },
    NODE_TYPE: {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11
    }
}
_.each([require('./clz.js')],function(fn){
    DOMUtil.prototype = _.assignIn(DOMUtil.prototype,fn(DOMUtil));
});
DOMUtil.fn.init.prototype = DOMUtil.fn;
console.dir(DOMUtil);

// var domUtil = {
//     //NODE类型
//
//     /**
//      * 选择器
//      * @param  {String} selector 选择器
//      * @param  {DOM} dom      dom范围
//      * @return {DOM|Array<DOM>}  返回选中的dom
//      */
//     $: function(selector, dom) {
//         var idReg = /#[^\.>\s]+$/,
//             isIdFlag = false;
//         if (!_.isString(selector)) {
//             throw new Error('need a string');
//         }
//         selector = util.trim(selector);
//
//         isIdFlag = idReg.test(selector);
//
//         if (!dom) {
//             dom = window.document;
//         }
//         if (isIdFlag) {
//             return qwery(selector, dom)[0];
//         } else {
//             return qwery(selector, dom);
//         }
//     },
//     text: function(node, text) {
//         var val;
//         _.each(node.childNodes, function(node) {
//             if (node.nodeType === this.NODE_TYPE.TEXT_NODE && text) {
//                 node.data = text;
//             } else if (node.nodeType === this.NODE_TYPE.TEXT_NODE && !text) {
//                 val = node.data;
//             }
//         }.bind(this));
//         return val || node;
//     },
//     html: function(node, text) {
//         var flag = node.nodeType === this.NODE_TYPE.ELEMENT_NODE;
//         if (flag && text) {
//             node.innerHTML = text;
//             return node;
//         } else if (flag && !text) {
//             return node.innerHTML;
//         }
//     }
//
// };
module.exports = DOMUtil;
