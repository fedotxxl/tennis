angular.module("app").
    factory("_data", function($timeout, _latestPromise) {
        var getList = function(filter) {
            console.log("Loading list", filter);

            return _latestPromise("getItems", $timeout(function() {
                var now = Date.now();

                var getItem = function(id) {
                    return {
                        id: id,
                        title: id + " list"
                    }
                };

                return [
                    getItem(now + 1),
                    getItem(now + 2),
                    getItem(now + 3)
                ]
            }, 4000));
        };

        var getItem = function(id) {
            console.log("Loading item", id);

            return _latestPromise("getItem", $timeout(function() {
                return {
                    id: id,
                    title: id + " item",
                    img: "a.jpg"
                }
            }, 4000));
        };

        return {
            getList: getList,
            getItem: getItem
        }
    });