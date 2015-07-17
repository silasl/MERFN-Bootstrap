var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    ReactBootstrap = require('react-bootstrap'),
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

var PageTwo = React.createClass({
    renderParam: function () {
        if (this.props.params.paramName) {
            return (
                <p>Param: {this.props.params.paramName}</p>
            );
        }
    },

    render: function () {
        return (
            <Row data-component-path="src/components/PageTwo">
                <Col xs={12}>
                    <h2>Page 2</h2>
                    {this.renderParam()}

                    <p>
                        <Link to="home">home</Link>
                    </p>
                </Col>
            </Row>
        );
    }
});

module.exports = PageTwo;