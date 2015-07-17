var ApplicationStore = require('../ApplicationStore'),
    ConfigStore = require('../ConfigStore');

describe('Config Store', function () {
    describe('getConfig', function () {
        var payload = {
            config: 'config'
        };

        beforeEach(function () {
            ConfigStore.setConfig(payload);
        });

        it('should create and populate Config in the application store', function () {
            expect(ApplicationStore.Config).toEqual(payload);
        });

        it('should set the store state to false', function () {
            expect(ApplicationStore.fetchStoreState('Config')).toEqual(false);
        });
    });
});