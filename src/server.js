var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    appRoute = require('./server/routes/app');

app.use('/', appRoute);
app.use('/page2/', appRoute);
app.use('/page2/*', appRoute);

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/../public'));
app.use( bodyParser.json() );

app.listen(process.env.PORT || 3000);

module.exports = app;