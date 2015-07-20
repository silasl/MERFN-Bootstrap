/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
var Dispatcher = require('../core/Dispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    ApplicationStore = require('./ApplicationStore');

var ItemStore = function() {
    this.dispatchToken = Dispatcher.register(function(action){

        switch (action.type) {
            case ActionTypes.GOT_ITEMS:
                this.setItems(action.payload);
                break;

            default:
            // Do nothing
        }

    }.bind(this));
};

ItemStore.prototype.setItems = function(payload) {
    ApplicationStore.setStoreState('Items', false);
    ApplicationStore.setStore('Items', payload, 'ITEMS_UPDATED');
};

module.exports = new ItemStore();