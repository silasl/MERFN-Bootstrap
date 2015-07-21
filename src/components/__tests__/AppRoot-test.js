var React = require('react/addons'),
    AppRoot = require('../AppRoot'),
    TestUtils = React.addons.TestUtils,
    ApiActions = require('../../actions/ApiActions'),
    ApplicationStore = require('../../stores/ApplicationStore'),
    ReactRouterContext = require('../../../test/ReactRouterContext'),
    stubComponent = require('../../../test/stubs/component');

describe('the App', function () {
    var renderedApp,
        appComponent,
        spinnerStub = stubComponent(),
        errorStub = stubComponent(),
        configUrl = 'http://localhost:3000/sampleConfig.json',
        RouteContext = new ReactRouterContext(AppRoot, {configUrl: configUrl});

    beforeEach(function () {
        spyOn(ApiActions, 'configureApp');
        spyOn(ApiActions, 'fetchItems');

        renderedApp = TestUtils.renderIntoDocument(
            <RouteContext />
        );
        appComponent = TestUtils.findRenderedComponentWithType(renderedApp, AppRoot);

        AppRoot.__set__({
            ErrorView: errorStub,
            Spinner: spinnerStub
        });
    });

    describe('on initial render', function() {
        it('should set loading to true', function() {
            expect(appComponent.state.loading).toBe(true);
        });

        it('should set error to false', function() {
            expect(appComponent.state.error).toBe(false);
        });

        it('should display the loading spinner', function() {
            var spinner = TestUtils.scryRenderedComponentsWithType(
                appComponent,
                spinnerStub
            );
            expect(spinner.length).toBe(1);
        });

        it('should fire the configureApp action with the configurl prop', function() {
            expect(ApiActions.configureApp).toHaveBeenCalledWith(configUrl);
        });
    });

    describe('when config throws an error', function () {
        beforeEach(function (done) {
            appComponent.setState({
                error: true,
                loading: false
            }, done);
        });

        it('should display an error', function () {
            var error = TestUtils.scryRenderedComponentsWithType(
                appComponent,
                errorStub
            );
            expect(error.length).toBe(1);
        });
    });

    describe('when config is complete', function () {
        beforeEach(function (done) {
            appComponent.onConfigUpdated();
            appComponent.setState({title: ''}, done);
        });

        it('should fire the fetchItems action', function() {
            expect(ApiActions.fetchItems).toHaveBeenCalled();
        });
    });

    describe('when items are loaded', function () {
        beforeEach(function (done) {
            appComponent.setState({loading: false}, done);
        });

        it('should hide the loading spinner', function () {
            var spinner = TestUtils.scryRenderedComponentsWithType(
                appComponent,
                spinnerStub
            );
            expect(spinner.length).toBe(0);
        });

        it('should load the app content', function () {
            var title = TestUtils.scryRenderedDOMComponentsWithTag(
                appComponent,
                'h1'
            );
            expect(title.length).toBe(1);
        });
    });

});