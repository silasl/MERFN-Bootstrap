var ApplicationStore = require('../ApplicationStore');

describe('Application Store', function () {
    var storeObject = {
        propertyName: 'propertyValue'
    };

    describe('setStore', function () {
        beforeEach(function () {
            spyOn(ApplicationStore, 'emit');

            ApplicationStore.setStore('Store', storeObject, 'event');
        });

        it('should create the specified store', function () {
            expect(ApplicationStore.Store).toEqual(storeObject);
        });
        
        it('should emit the specified change event', function () {
            expect(ApplicationStore.emit).toHaveBeenCalledWith('event');
        });
    });

    describe('setStoreProperty', function () {
        beforeEach(function () {
            ApplicationStore.setStoreProperty('Store', 'propertyName', 'newPropertyValue');
        });

        it('should set the specified value on the specified store', function () {
            expect(ApplicationStore.Store.propertyName).toBe('newPropertyValue');
        });
    });

    describe('fetchStore', function () {
        var store;

        beforeEach(function () {
            store = ApplicationStore.fetchStore('Store');
        });

        it('should return the requested store', function () {
            expect(store).toEqual(storeObject);
        });
    });

    describe('fetchStoreProperty', function () {
        var storeProperty;

        beforeEach(function () {
            storeProperty = ApplicationStore.fetchStoreProperty('Store', 'propertyName');
        });

        it('should return the requested store property', function () {
            expect(storeProperty).toEqual('newPropertyValue');
        });
    });

    describe('Store state', function () {
        var storeState;

        it('should initially return true', function () {
            storeState = ApplicationStore.fetchStoreState('StateStore');
            expect(storeState).toBe(true);
        });

        it('should return false when set to false', function () {
            ApplicationStore.setStoreState('StateStore', false);
            storeState = ApplicationStore.fetchStoreState('StateStore');
            expect(storeState).toBe(false);
        });
    });
});