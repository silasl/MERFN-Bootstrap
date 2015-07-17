var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

var ErrorView = React.createClass({
    render: function () {
        return (
            <Row {...this.props} data-component-path="src/components/ErrorView">
                <Col xs={12}>
                    <h3>{this.props.title}</h3>

                    {this.props.children}
                </Col>
            </Row>
        );
    }
});

module.exports = ErrorView;