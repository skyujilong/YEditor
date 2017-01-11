'use strict';
var _ = require('lodash/core');
var util = require('./util.js');
var qwery = require('qwery');


var domUtil = {
    //NODE类型
    NODE_TYPE:{
        ELEMENT_NODE : 1,
        TEXT_NODE : 3,
        COMMENT_NODE : 8,
        DOCUMENT_NODE : 9,
        DOCUMENT_TYPE_NODE : 10,
        DOCUMENT_FRAGMENT_NODE : 11
    },
    /**
     * 选择器
     * @param  {String} selector 选择器
     * @param  {DOM} dom      dom范围
     * @return {DOM|Array<DOM>}  返回选中的dom
     */
    $: function(selector, dom) {
        var idReg = /#[^\.>\s]+$/,
            isIdFlag = false;
        if (!_.isString(selector)) {
            throw new Error('need a string');
        }
        selector = util.trim(selector);

        isIdFlag = idReg.test(selector);

        if (!dom) {
            dom = window.document;
        }
        if (isIdFlag) {
            return qwery(selector, dom)[0];
        } else {
            return qwery(selector, dom);
        }
    },
    text: function(node, text) {
        var val;
        _.each(this.getChildren(node),function(node){
            if(node.nodeType === this.NODE_TYPE.TEXT_NODE && text){
                node.data = text;
            }else if(node.nodeType === this.NODE_TYPE.TEXT_NODE && !text){
                val = node.data;
            }
        }.bind(this));
        return val || node;
    },
    getChildren: function(node){
        return node.childNodes;
    }

};
module.exports = domUtil;
