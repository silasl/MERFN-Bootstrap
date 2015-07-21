var React = require('react/addons'),
    Items = require('../Items'),
    ApplicationStore = require('../../stores/ApplicationStore'),
    ReactRouterContext = require('../../../test/ReactRouterContext'),
    TestUtils = React.addons.TestUtils;

describe('the Items component', function () {
    var renderedApp,
        appComponent,
        params = {
            itemId: '1'
        },
        items = [
            {
                _id: '1',
                itemName: 'item 1'
            },
            {
                _id: '2',
                itemName: 'item 2'
            }
        ],
        RouteContext = new ReactRouterContext(Items, {params: params});

    beforeEach(function (done) {
        ApplicationStore.setStore('Items', items);

        renderedApp = TestUtils.renderIntoDocument(
            <RouteContext />
        );
        appComponent = TestUtils.findRenderedComponentWithType(renderedApp, Items);

        var checkReady = function () {
            if (appComponent.state.items.length) {
                done();
            }
            else {
                setTimeout(checkReady, 100);
            }
        };

        checkReady();
    });

    describe('when rendering the component', function () {
        it('should render an li element for each item', function () {
            var items = TestUtils.scryRenderedDOMComponentsWithTag(
                appComponent,
                'li'
            );
            expect(items.length).toBe(2);
        });
    });

    describe('when a url param is present', function () {
        it('should add a disabled class to the corresponding item', function () {
            var disabled = TestUtils.findRenderedDOMComponentWithClass(
                appComponent,
                'disabled'
            );
            expect(disabled.getDOMNode().textContent).toBe('item 1');
        });
    });
});