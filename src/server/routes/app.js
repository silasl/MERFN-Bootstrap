var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('View/index');
});

module.exports = router;