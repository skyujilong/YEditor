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
        if (_.isString(selector)) {
            this.selector = selector;
            selector = util.trim(selector);
            if (!context) {
                context = window.document;
            }
            eleList = qwery(selector, context);
            this.length = eleList.length;
            _.forEach(eleList, function(ele, index) {
                this[index] = ele;
            }.bind(this));
        } else if (_.isObject(selector) && selector.nodeType === this.NODE_TYPE.ELEMENT_NODE) {
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
    },
    guid: 0
}
_.each([
    require('./clz.js'),
    require('./attr.js'),
    require('./event.js')
], function(fn) {
    DOMUtil.prototype = _.assignIn(DOMUtil.prototype, fn(DOMUtil));
});
DOMUtil.fn.init.prototype = DOMUtil.fn;

module.exports = DOMUtil;
