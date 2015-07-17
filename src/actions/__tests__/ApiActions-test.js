var ApiActions = require('../ApiActions'),
    Dispatcher = require('../../core/Dispatcher'),
    ActionTypes = require('../../constants/ActionTypes'),
    ApplicationStore = require('../../stores/ApplicationStore'),
    $ = require('jquery');

describe('Api Actions', function () {
    var sampleConfig = {
        config: 'config'
    };

    describe('configureApp', function() {
        it('should call the config endpoint', function() {
            spyOn($, 'ajax');

            ApiActions.configureApp();

            expect($.ajax).toHaveBeenCalled();
        });
    });

    describe('Dispatcher', function() {
        it('should fire an event which is picked up by a store', function() {
            Dispatcher.dispatch({
                type: ActionTypes.GOT_CONFIG,
                payload: sampleConfig
            });

            expect(ApplicationStore.Config).toEqual(sampleConfig);
        });
    });
});