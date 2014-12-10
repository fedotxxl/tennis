angular.module("common").
    factory("_latestPromise", function($q) {
        var calls = {};

        var isLatest = function(name, date) {
            return calls[name] == date;
        };

        var remember = function(name) {
            var now = Date.now();
            calls[name] = now;
            return now;
        };

        return function(name, promise) {
            var date = remember(name);
            var defer = $q.defer();

            promise.then(function (data) {
                if (isLatest(name, date)) {
                    defer.resolve(data);
                }
            }, function (data) {
                if (isLatest(name, date)) {
                    defer.reject(data);
                }
            });

            return defer.promise;
        };
    });