'use strict';
var _ = require('lodash/core');

module.exports = function($) {

    return {
        attr: function(key, value) {
            if(!_.isUndefined(value)){
                _.each(this,function(el){
                    el.setAttribute(key,value);
                });
                return this;
            }

            return this[0].getAttribute(key);
        },
        removeAttr: function(key) {
            _.each(this,function(el){
                el.removeAttribute(key);
            });
            return this;
        },
        val : function(val){
            if(arguments.length === 0){
                return this[0].value;
            }else{
                _.forEach(this,function(el){
                    el.value = val;
                });
                return this;
            }
        },
        selected: function(){
            
        }
    }

};
