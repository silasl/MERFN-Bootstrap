var React = require('react'),
    ReactRouter = require('react-router'),
    RouteHandler = ReactRouter.RouteHandler,
    ApiActions = require('../actions/ApiActions'),
    ApplicationStore = require('../stores/ApplicationStore'),
    ConfigStore = require('../stores/ConfigStore'),
    ErrorView = require('./ErrorView'),
    ReactBootstrap = require('react-bootstrap'),
    Grid = ReactBootstrap.Grid,
    Spinner = require('react-spinner');

var AppRoot = React.createClass({
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
        ApplicationStore.onChange('CONFIG_UPDATED', this.onConfigLoaded);
        ApiActions.configureApp(this.props.configUrl);
    },

    componentWillUnmount: function () {
        ApplicationStore.off('CONFIG_ERROR_THROWN', this.throwError);
        ApplicationStore.off('CONFIG_UPDATED', this.onConfigLoaded);
    },


    throwError: function () {
        this.setState({
            loading: false,
            error: true
        });
    },

    onConfigLoaded: function () {
        this.setState({
            title: ApplicationStore.fetchStoreProperty('Config', 'appTitle'),
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
            <Grid data-component-path="src/AppRoot">
                <h1>{this.state.title}</h1>
                {this.renderAppComponent()}
            </Grid>
        );
    }
});

module.exports = AppRoot;