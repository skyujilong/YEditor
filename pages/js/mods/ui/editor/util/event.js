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
        removeEvent: function(type, guid) {
            _.each(this, function(el) {
                if (el.removeEventListener) {
                    el.removeEventListener(_.isString(type) ? type : '', el.cacheFn[guid] ? el.cacheFn[guid] : undefined);
                } else {
                    el.detachEvent(_.isString(type) ? ('on' + type) : '', el.cacheFn[guid] ? el.cacheFn[guid] : undefined);
                }
                if(_.isString(type) && _.isNumber(guid)){
                    delete el.cacheFn[guid];
                }else if(_.isUndefined(type)){
                    delete el.cacheFn;
                }
            });
        },
        off: function(type, handler) {
            if (arguments.length === 0) {
                // remove all event
                this.removeEvent();
            } else if (_.isString(type) && _.isFunction(handler) && _.isNumber(handler.guid)) {
                // remove handler event 必须有guid才能够删除内容
                this.removeEvent(type,handler.guid);
            } else if (_.isString(type) && _.isFunction(handler) && !_.isNumber(handler.guid)) {
                return this;
            } else if (_.isString(type) && _.isUndefined(handler)) {
                // remove type all event
                this.removeEvent(type);
            }
            return this;
        }
    }
};
