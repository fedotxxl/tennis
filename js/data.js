angular.module("app").
    factory("_data", function($timeout) {

        var getList = function(filter) {
            console.log("Loading list", filter);

            return $timeout(function() {
                var now = Date.now();

                return [
                    now + 1,
                    now + 2,
                    now + 3
                ]
            }, 4000);
        };

        var getItem = function(id) {
            console.log("Loading item", id);

            return $timeout(function() {
                return Date.now();
            }, 4000);
        };

        return {
            getList: getList,
            getItem: getItem
        }
    });