'use strict';
var _ = require('lodash/core');
var util = require('./util.js');
module.exports = function($) {

    // 添加到 el上面
    return {
        on: function(type, handler) {
            var typeList, _self = this;
            if (!_.isString(type)) {
                throw new Error('need string');
            }
            if (!_.isFunction(handler)) {
                throw new Error('need function');
            }

            if (!handler.guid) {
                handler.guid = $.fn.guid++;
            }

            type = util.trim(type).replace(/\s+/g, ' ');

            typeList = type.split(' ');
            this.__events = !!this.__events ? this.__events : {};

            _.each(typeList, function(type) {
                _self.addEvent(type, handler);
            });

            return this;
        },
        addEvent: function(type, handler) {
            _.each(this, function(el) {
                var callHandler = function(e) {
                    e = !!e ? e : window.event;
                    handler.call(el, handler);
                };
                callHandler.type = type;
                callHandler.guid = handler.guid;
                el.cacheFn = !el.cacheFn ? {} : el.cacheFn;
                el.cacheFn[callHandler.guid] = callHandler;
                if (el.addEventListener) {
                    el.addEventListener(type, callHandler, false);
                } else {
                    el.attachEvent('on' + type, callHandler);
                }
            });
        },
        off: function() {

        }
    }
};
