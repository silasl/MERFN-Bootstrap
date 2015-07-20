var monk = require('monk'),
    Q = require('q');

module.exports = ItemRepository;

function ItemRepository() {
    this.db = monk(process.env.MONGO_URL);
    this.collection = this.db.get('items');
}

ItemRepository.prototype.insert = function (item) {
    var deferred = Q.defer();

    this.collection.insert(item, function (e, docs) {
        if (e) {
            return deferred.reject(e);
        }
        deferred.resolve(docs);
    });

    return deferred.promise;
};

ItemRepository.prototype.get = function () {
    var deferred = Q.defer();

    this.collection.find({}, {}, function (e, docs) {
        if (e) {
            return deferred.reject(e);
        }

        deferred.resolve(docs);
    });

    return deferred.promise;
};