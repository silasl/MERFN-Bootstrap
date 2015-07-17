var React = require('react/addons'),
    EventButton = require('../EventButton'),
    TestUtils = React.addons.TestUtils;

describe('the Event button component', function () {
    var renderedComponent,
        button,
        loadingText = 'loading...',
        buttonText = 'button text',
        falseEvent = 'event',
        dummyFunction = function(){};

    beforeEach(function (done) {
        renderedComponent = TestUtils.renderIntoDocument(
            <EventButton children={buttonText} listenFor={falseEvent} />
        );

        button = TestUtils.findRenderedDOMComponentWithTag(
            renderedComponent,
            'button'
        );

        renderedComponent.setState({
            loadingText: loadingText,
            loading: false,
            clickEvent: dummyFunction
        }, done);
    });

    describe('when rendering the component', function() {
        it('should render a button with inherited text', function() {
            expect(button.getDOMNode().textContent).toBe(buttonText);
        });
    });

    describe('when the button is clicked', function() {
        beforeEach(function (done) {
            spyOn(renderedComponent.state, 'clickEvent');

            TestUtils.Simulate.click(button);

            var checkReady = function () {
                if (renderedComponent.state.loading) {
                    done();
                }
                else {
                    setTimeout(checkReady, 100);
                }
            };

            checkReady();
        });
        it('should display loading text', function() {
            expect(button.getDOMNode().textContent).toBe(loadingText);
        });

        it('should fire the inherited function', function() {
            expect(renderedComponent.state.clickEvent).toHaveBeenCalled();
        });
    });
});