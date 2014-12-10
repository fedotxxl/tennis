angular.module('app').
    controller("ListAndItemController", function($scope, $location) {
        var params = $.vUrlToObject(window.location.href, "+", "f.price"); //todo add converter to array

        $scope.shared = {
            filter: params.f || {},
            item: params.item
        };

        $scope.$watch('shared', function (current, prev) {
                $location.path($.vObjectToUrl({
                    f: current.filter,
                    item: current.item
                }))
            }, true);

        $scope.setItem = function(item) {
            $scope.shared.item = item.id;
        };

        $scope.modelToUrl = function(changes) {
            var obj = $.extend({}, $scope.shared, changes);

            return $.vObjectToUrl(obj);
        };
    }).
    controller('FilterController', function($scope, _data, _filter) {
        var loadItems = function() {
            $scope.loading = true;
            _data.getList($scope.shared.filter).then(function(items) {
                $scope.items = items;
                $scope.loading = false;
            });
        };

        $scope.$watch('shared.filter', function (current, prev) {
            loadItems();
        }, true);
    }).
    controller('ItemController', function($scope, _data) {
        var loadItem = function() {
            if ($scope.shared.item) {
                $scope.loading = true;
                _data.getItem($scope.shared.item).then(function(item) {
                    $scope.item = item;
                    $scope.loading = false;
                });
            }
        };

        $scope.$watch('shared.item', function (current, prev) {
                if (current != prev) {
                    loadItem();
                }
            }
        );
    }).
    config(function($locationProvider) {
//        $locationProvider.html5Mode(true);
    });