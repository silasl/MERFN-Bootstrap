var React = require('react'),
    AppRoot = require('./components/AppRoot'),
    HomePage = require('./components/HomePage'),
    PageTwo = require('./components/PageTwo'),
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
                <Route name="page2" handler={PageTwo} />
                <Route name="page2/:paramName" handler={PageTwo} />
            </Route>
        );

    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
        React.render(<Handler configUrl={configUrl} />, document.getElementById(elementId));
    });
};