var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    ComponentPathMixin = require('../ComponentPathMixin')('/../test/path');

describe('ComponentPathMixin', function () {
    var TestComponent = React.createClass({
            mixins: [ComponentPathMixin],
            render: function () {
                return (
                    <div />
                );
            }
        }),
        renderedComponent,
        element;

    beforeEach(function () {
        renderedComponent = TestUtils.renderIntoDocument(
            <TestComponent />
        );

        element = React.findDOMNode(renderedComponent);
    });

    describe('ComponentPathMixin', function() {
        it('should add an attribute to the react component reflecting the path to the component source', function() {
            expect(element.dataset.componentPath).toBe('test/path/TestComponent');
        });

        describe('When a context is provided', function() {
            beforeEach(function () {
                renderedComponent = TestUtils.renderIntoDocument(
                    <TestComponent componentContext="context" />
                );

                element = React.findDOMNode(renderedComponent);
            });

            it('should add the context to the path as a suffix', function() {
                expect(element.dataset.componentPath).toBe('test/path/TestComponent-context');
            });
        });
    });
});