var React = require('react'),
    ComponentPathMixin = require('../mixins/ComponentPathMixin')(__dirname),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    ReactBootstrap = require('react-bootstrap'),
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

var HomePage = React.createClass({
    mixins: [ComponentPathMixin],

    render: function () {
        return (
            <Row data-component-path="src/components/HomePage">
                <Col xs={12}>
                    <h2>Home page</h2>

                    <p>
                        <Link to="items">View items</Link>
                    </p>
                </Col>
            </Row>
        );
    }
});

module.exports = HomePage;