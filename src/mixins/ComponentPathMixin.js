var ComponentPathMixin = function(dir, context){
    var componentPath = dir || '',
        renderPath = componentPath.replace('/../', '') + '/',
        suffix = context ? '-' + context : '';

    return {
        componentDidMount: function () {
            if(this.constructor.displayName){
                this.getDOMNode().setAttribute('data-component-path', renderPath + this.constructor.displayName + suffix);
            }
        }
    };
};

module.exports = ComponentPathMixin;