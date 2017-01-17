'use strict';

var _ = require('lodash/core');
var util = require('./util');

module.exports = function($) {

    function getClassList(el) {
        return util.trim(el.className).replace(/\s+/, ' ').split(' ');
    }

    return {
        addClass: function(clzName) {
            var reg;
            if (!_.isString(clzName)) {
                throw new Error('need string');
            }
            clzName = clzName.replace(/\s+/g, ' ').replace(/^\s+/, '').replace(/\s*$/, '');
            reg = new RegExp(clzName, 'i');
            _.forEach(this, function(el) {
                var clzNameList = getClassList(el);
                if (clzNameList.length === 0) {

                } else {

                }
                if (!reg.test(el.className)) {
                    el.className += ((el.className ? ' ' : '') + clzName);
                }
            }.bind(this));
            return this;
        },
        hasClass: function(clzName) {
            getClassList(this[1]);
            var flag = false,
                reg;
            if (!_.isString(clzName)) {
                throw new Error('need string');
            }
            clzName = clzName.replace(/\s+/g, ' ').replace(/^\s+/, '').replace(/\s*$/, '');
            reg = new RegExp(clzName, 'i');
            _.forEach(this, function(el) {
                var clzName = el.className;
                if (!flag && reg.test(clzName)) {
                    flag = true;
                }
            });
            return flag;
        },
        removeClass: function() {

        }
    };
};
