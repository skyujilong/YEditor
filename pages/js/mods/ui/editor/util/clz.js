'use strict';

var _ = require('lodash/core');
var util = require('./util');

module.exports = function($) {

    /**
     * 循环dom中的className
     * @param  {[type]}   $el     [description]
     * @param  {[type]}   clzName 外面传过来要操作的className
     * @param  {Function} fn      回调函数
     * @param  {[type]}   scope   作用域
     * @return {[type]}           [description]
     */
    function eachClass($el, clzName, fn, scope) {
        var clzList;
        clzName = util.trim(clzName.replace(/\s+/g, ' '));
        clzList = clzName.split(' ');
        _.each($el, function(el) {
            _.each(clzList, function(clzName) {
                fn.call(scope || null, el, clzName);
            });
        });
    }

    return {
        addClass: function(clzName) {

            if (!_.isString(clzName)) {
                throw new Error('need string');
            }
            eachClass(this, clzName, function(el, clz) {
                if (el.className.indexOf(clz) < 0) {
                    el.className += ((el.className ? ' ' : '') + clz);
                }
            }, this);
            return this;
        },
        hasClass: function(clzName) {
            var flag = false;
            if(!_.isString(clzName)){
                throw new Error('need string');
            }
            eachClass(this, clzName, function(el, clz) {
                if (el.className.indexOf(clz) >=0  && !flag) {
                    flag = true;
                }
            }, this);
            return flag;
        },
        removeClass: function(clzName) {
            if (!_.isString(clzName)) {
                throw new Error('need string');
            }
            eachClass(this, clzName, function(el, clz) {
                var reg, curClzName = el.className;
                if (el.className.indexOf(clz) >= 0) {
                    reg = new RegExp('\s*' + clz + '\s*');
                    curClzName = curClzName.replace(reg, ' ');
                    if (/^\s+$/.test(curClzName)) {
                        el.className = '';
                    } else {
                        el.className = curClzName;
                    }
                }
            }, this);
            return this;
        }
    };
};
