/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
var Dispatcher = require('../core/Dispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    ApplicationStore = require('./ApplicationStore');

var ConfigStore = function() {
    this.dispatchToken = Dispatcher.register(function(action){

        switch (action.type) {
            case ActionTypes.GOT_CONFIG:
                this.setConfig(action.payload);
                break;

            default:
            // Do nothing
        }

    }.bind(this));
};

ConfigStore.prototype.setConfig = function(payload) {
    ApplicationStore.setStoreState('Config', false);
    ApplicationStore.setStore('Config', payload, 'CONFIG_UPDATED');
};

module.exports = new ConfigStore();