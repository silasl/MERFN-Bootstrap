var Dispatcher = require('../core/Dispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    $ = require('jquery'),
    ApplicationStore = require('../stores/ApplicationStore');

module.exports = {

    configureApp: function (configUrl) {
        ApplicationStore.setStoreState('Config', true);

        this.makeAjaxCall(configUrl, 'GET', function (data) {
            this.queueDispatch('GOT_CONFIG', {
                payload: data
            });
        }.bind(this), 'CONFIG_ERROR');
    },

    fetchItems: function () {
        this.makeAjaxCall('/api/items', 'GET', function (items) {
            this.queueDispatch('GOT_ITEMS', {
                payload: items
            });
        }.bind(this), 'DB_ERROR');
    },

    insertItem: function (item) {
        this.makeAjaxCall('/api/items', 'POST', function () {
            this.fetchItems();
        }.bind(this), 'DB_ERROR', JSON.stringify(item));
    },

    makeAjaxCall: function (url, type, success, error, data) {
        var self = this;
        $.ajax({
            url: url,
            contentType: 'application/json',
            dataType: 'json',
            type: type,
            data: data || null,
            tryCount: 0,
            retryLimit: 3,

            success: function (data) {
                success(data);
            },

            error: function () {
                window.setTimeout(function () {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    } else {
                        self.queueDispatch(error);
                    }
                }.bind(this), 500);
            }
        });
    },

    queueDispatch: function (event, props) {
        var dispatchObject = {
            type: ActionTypes[event]
        };

        for (var key in props) {
            if (props.hasOwnProperty(key)) {
                dispatchObject[key] = props[key];
            }
        }
        setTimeout(function () {
            Dispatcher.dispatch(dispatchObject);
        }, 1);
    }
};