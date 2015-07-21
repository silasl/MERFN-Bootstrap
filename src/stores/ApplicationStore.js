/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

var EventEmitter = require('eventemitter3'),
    Dispatcher = require('../core/Dispatcher'),
    ActionTypes = require('../constants/ActionTypes');

var ApplicationStore = function() {
    this.dispatchToken = Dispatcher.register(function(action){

        switch (action.type) {
            case ActionTypes.CONFIG_ERROR:
                this.emitChange('CONFIG_ERROR_THROWN');
                break;

            case ActionTypes.DB_ERROR:
                this.emitChange('DB_ERROR_THROWN');
                break;

            default:
            // Do nothing
        }

    }.bind(this));

    this.states = {};

    this.fetchStore = function(store){
        return this[store] || {};
    };

    this.fetchStoreProperty = function(store, property){
        if(this[store]){
            return this[store][property];
        }
    };

    this.fetchStoreState = function(store){
        if(this.states.hasOwnProperty(store)){
            return this.states[store];
        } else {
            return true;
        }
    };
};

ApplicationStore.prototype = Object.create(EventEmitter.prototype);

ApplicationStore.prototype.setStore = function(store, payload, change_event) {
    this[store] = payload;
    this.emitChange(change_event);
};

ApplicationStore.prototype.setStoreState = function(store, state) {
    this.states[store] = state;
};

ApplicationStore.prototype.setStoreProperty = function(store, property, value, change_event) {
    if(this[store]){
        this[store][property] = value;
    }
    this.emitChange(change_event);
};

ApplicationStore.prototype.emitChange = function(change_event) {
    return this.emit(change_event);
};

ApplicationStore.prototype.onChange = function(change_event, callback) {
    this.on(change_event, callback);
};

ApplicationStore.prototype.off = function(change_event, callback) {
    this.removeListener(change_event, callback);
};

module.exports = new ApplicationStore();