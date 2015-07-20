var React = require('react'),
    AppRoot = require('./components/AppRoot'),
    HomePage = require('./components/HomePage'),
    Items = require('./components/Items'),
    ReactRouter = require('react-router'),
    PolyFills = require('./utils/polyfills'),
    Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;

global.MERFNApp = module.exports = MERFNApp;

function MERFNApp() {
    if (!(this instanceof MERFNApp)) {
        return new MERFNApp(arguments);
    }
}

MERFNApp.version = require('package.version');

MERFNApp.prototype.render = function (elementId, configUrl, rootPath) {
    rootPath = rootPath || '/';
    var routes = (
            <Route name="app" path={rootPath} handler={AppRoot}>
                <DefaultRoute name="home" handler={HomePage} />
                <Route name="items" handler={Items} />
                <Route name="items/:itemId" handler={Items} />
            </Route>
        );

    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
        React.render(<Handler configUrl={configUrl} />, document.getElementById(elementId));
    });
};