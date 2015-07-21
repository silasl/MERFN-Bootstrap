var ApplicationStore = require('../ApplicationStore'),
    ItemStore = require('../ItemStore');

describe('Item Store', function () {
    describe('setItems', function () {
        var payload = [
            {
                _id: '1',
                itemName: 'item 1'
            }
        ];

        beforeEach(function () {
            ItemStore.setItems(payload);
        });

        it('should create and populate Items in the application store', function () {
            expect(ApplicationStore.Items).toEqual(payload);
        });

        it('should set the store state to false', function () {
            expect(ApplicationStore.fetchStoreState('Items')).toEqual(false);
        });
    });
});