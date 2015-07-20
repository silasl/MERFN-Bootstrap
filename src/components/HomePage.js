var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    ReactBootstrap = require('react-bootstrap'),
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

var HomePage = React.createClass({
    render: function () {
        return (
            <Row data-component-path="src/components/HomePage">
                <Col xs={12}>
                    <h2>Home page</h2>

                    <p>
                        <Link to="items">View items</Link>
                    </p>

                    <p>
                        <Link to="items/:itemId" params={{itemId: "item"}}>Go to page 2 with param</Link>
                    </p>
                </Col>
            </Row>
        );
    }
});

module.exports = HomePage;