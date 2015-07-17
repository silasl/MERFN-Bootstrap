/*
 *
 * This is used to build the bundle with browserify.
 *
 */
var MERFNApp = require('../app');

if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('MERFNApp', function () { return MERFNApp; });
} else if (global.window) {
    global.window.MERFNApp = MERFNApp;
}