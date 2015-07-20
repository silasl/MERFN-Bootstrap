var express = require('express'),
    ItemRepository = require('../../repository/item'),
    router = express.Router();

var itemRepository = new ItemRepository();

router.get('/', function (req, res) {
    itemRepository.get()
        .then(function(items) {
            res.status(200).json(items);
        })
        .catch(function (e) {
            res.status(400).json({error: e});
        });

});

router.post('/', function (req, res) {
    itemRepository.insert(req.body)
        .then(function() {
            res.status(204).send();
        })
        .catch(function (e) {
            res.status(400).json({error: e});
        });
});

module.exports = router;