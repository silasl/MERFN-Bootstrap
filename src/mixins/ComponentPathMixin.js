var ComponentPathMixin = function(dir){
    var componentPath = dir || '',
        renderPath = componentPath.replace('/../', '') + '/',
        suffix = '';

    return {
        componentDidMount: function () {
            if(this.props.componentContext){
                suffix = '-' + this.props.componentContext;
            }
            if(this.constructor.displayName){
                this.getDOMNode().setAttribute('data-component-path', renderPath + this.constructor.displayName + suffix);
            }
        }
    };
};

module.exports = ComponentPathMixin;