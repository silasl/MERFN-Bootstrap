var React = require('react'),
    ComponentPathMixin = require('../mixins/ComponentPathMixin')(__dirname),
    ReactRouter = require('react-router'),
    RouteHandler = ReactRouter.RouteHandler,
    ApiActions = require('../actions/ApiActions'),
    ApplicationStore = require('../stores/ApplicationStore'),
    ConfigStore = require('../stores/ConfigStore'),
    ItemStore = require('../stores/ItemStore'),
    ErrorView = require('./ErrorView'),
    ReactBootstrap = require('react-bootstrap'),
    Grid = ReactBootstrap.Grid,
    Spinner = require('react-spinner');

var AppRoot = React.createClass({
    mixins: [ComponentPathMixin],

    propTypes: {
        configUrl: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            loading: true,
            error: false
        };
    },

    componentWillMount: function () {
        ApplicationStore.onChange('CONFIG_ERROR_THROWN', this.throwError);
        ApplicationStore.onChange('CONFIG_UPDATED', this.onConfigUpdated);
        ApplicationStore.onChange('ITEMS_UPDATED', this.onItemsUpdated);
        ApiActions.configureApp(this.props.configUrl);
    },

    componentWillUnmount: function () {
        ApplicationStore.off('CONFIG_ERROR_THROWN', this.throwError);
        ApplicationStore.off('CONFIG_UPDATED', this.onConfigUpdated);
        ApplicationStore.off('ITEMS_UPDATED', this.onItemsUpdated);
    },


    throwError: function () {
        this.setState({
            loading: false,
            error: true
        });
    },

    onConfigUpdated: function () {
        this.setState({
            title: ApplicationStore.fetchStoreProperty('Config', 'appTitle')
        }, function(){
            ApiActions.fetchItems();
        });
    },

    onItemsUpdated: function(){
        this.setState({
            loading: false
        });
    },

    renderAppComponent: function () {
        if (this.state.loading) {
            return (
                <Spinner />
            );
        }

        if (this.state.error) {
            return (
                <ErrorView title="Config error">
                    <p>Site config has failed.</p>
                </ErrorView>
            );
        }

        return (
            <RouteHandler />
        );
    },

    render: function () {
        return (
            <Grid>
                <h1>{this.state.title}</h1>
                {this.renderAppComponent()}
            </Grid>
        );
    }
});

module.exports = AppRoot;
