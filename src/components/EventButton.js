var React = require('react'),
    ApplicationStore = require('../stores/ApplicationStore'),
    ReactBootstrap = require('react-bootstrap'),
    Button = ReactBootstrap.Button;

var EventButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },

    componentWillMount: function (){
        this.setState({
            loadingText: ApplicationStore.fetchStoreProperty('Config', 'EventButtonLoadingState'),
            loading: false,
            clickEvent: this.props.onClick
        });

        if(this.props.listenFor.length){
            for (var i = 0; i < this.props.listenFor.length; i++) {
                ApplicationStore.onChange(this.props.listenFor[i], this.eventFired);
            }
        }
    },

    componentWillUnmount: function () {
        if(this.props.listenFor.length){
            for (var i = 0; i < this.props.listenFor.length; i++) {
                ApplicationStore.off(this.props.listenFor[i], this.eventFired);
            }
        }
    },

    eventFired: function(){
        this.setState({ loading: false });
    },

    handleClick: function(){
        this.setState({ loading: this.props.listenFor ? true : false }, function(){
            this.state.clickEvent();
        });
    },

    render: function () {
        var isLoading = this.state.loading,
            disabled = this.props.disabled;
        return (
            <Button
                data-component-path="src/components/EventButton"
                {...this.props}
                disabled={disabled || isLoading}
                onClick={this.handleClick}>
                    {!isLoading ? this.props.children : this.state.loadingText}
            </Button>
        );
    }
});

module.exports = EventButton;