var React = require('react'),
    ApiActions = require('../actions/ApiActions'),
    EventButton = require('./EventButton'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    ReactBootstrap = require('react-bootstrap'),
    ApplicationStore = require('../stores/ApplicationStore'),
    Input = ReactBootstrap.Input,
    ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

var Items = React.createClass({
    getInitialState: function () {
        return {
            items: ApplicationStore.fetchStore('Items'),
            selectedItem: this.props.params.itemId || null,
            itemName: null
        };
    },

    componentWillMount: function () {
        ApplicationStore.onChange('ITEMS_UPDATED', this.onItemsUpdated);
    },

    componentWillUnmount: function () {
        ApplicationStore.off('ITEMS_UPDATED', this.onItemsUpdated);
    },

    onItemsUpdated: function () {
        this.setState({
            items: ApplicationStore.fetchStore('Items')
        });
    },

    handleInputChange: function (e) {
        this.setState({
            itemName: e.target.value
        });
    },

    insertItem: function () {
        ApiActions.insertItem({
            itemName: this.state.itemName
        });
        this.setState({
            itemName: null
        });
    },

    setSelectedItem: function (id) {
        this.setState({
            selectedItem: id
        });
    },

    fetchItems: function () {

        return this.state.items.map(function (item) {
            return (
                <ListGroupItem key={item._id} disabled={item._id === this.state.selectedItem}>
                    <Link
                        to="items/:itemId"
                        params={{itemId: item._id}}
                        onClick={this.setSelectedItem.bind(null, item._id)}>
                        {item.itemName}
                    </Link>
                </ListGroupItem>
            );
        }.bind(this));
    },

    render: function () {
        return (
            <Row data-component-path="src/components/Items">
                <Col xs={12}>
                    <h2>Items</h2>

                    <p>
                        <Link to="home">home</Link>
                    </p>
                </Col>

                <Col xs={12}>
                    <ListGroup>
                        {this.fetchItems()}
                    </ListGroup>
                </Col>


                <Col xs={12}>
                    <Input type="text"
                           label="Insert item"
                           name="item"
                           placeholder="item name"
                           value={this.state.itemName}
                           onChange={this.handleInputChange}/>

                    <EventButton
                        bsSize='large'
                        block
                        listenFor={['ITEMS_UPDATED', 'DB_ERROR_THROWN']}
                        disabled={!(this.state.itemName && this.state.itemName.length > 1)}
                        onClick={this.insertItem}>
                        Insert item
                    </EventButton>
                </Col>
            </Row>
        );
    }
});

module.exports = Items;