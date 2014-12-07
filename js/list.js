angular.module('app').
    controller("ListAndItemController", function($scope) {
        $scope.shared = {};
    }).
    controller('ListAndItemRouterController', function($scope, $stateParams) {
        $scope.shared.filterUrl = $stateParams.filter;
        $scope.shared.itemId = $stateParams.item;
    }).
    controller('FilterController', function($scope, _data, _filter) {
        var lastFilterUrl = null;

        var loadItems = function() {
            $scope.loading = true;
            _data.getList(_filter.toCheckedObject()).then(function(items) {
                $scope.items = items;
                $scope.loading = false;
            });
        };

        $scope.$watch('shared.filterUrl', function (current, prev) {
                if (lastFilterUrl != current) {
                    _filter.fromUrl(current);
                    lastFilterUrl = null;
                }
            }
        );

        $scope.$watch(_filter.toUrl, function (current, prev) {
                if (current != prev) {
                    loadItems();
                }
            }
        );
    }).
    controller('ItemController', function($rootScope, $scope, _data) {
        var lastItemId = null;

        var loadItem = function() {
            if ($rootScope.shared && $rootScope.shared.item) {
                $scope.loading = true;
                _data.getItem($rootScope.shared.itemId).then(function(item) {
                    $scope.item = item;
                    $scope.loading = false;
                });
            }
        };

        $scope.$watch('shared.itemId', function (current, prev) {
                if (current != lastItemId) {
                    loadItem();
                    lastItemId = current;
                }
            }
        );
    }).
    config(function($stateProvider, $urlRouterProvider) {

//        $locationProvider.html5Mode(true);
//        $routeProvider.otherwise('/list');
        $urlRouterProvider.otherwise('/list');

//        $routeProvider.when("/list", {
//            templateUrl:'/partials/partial-list.html',
//            controller:'ListController',
//            reloadOnSearch: false});
//
        $stateProvider.
            state('list', {
                url: '/list/:filter/:item',

                views: {
                    '': {
                        template: '<div></div>',
                        controller: 'ListAndItemRouterController'
                    }
//                    'list@list': {
//                        templateUrl: '/partials/partial-list-list.html',
//                        controller: 'FilterController'
//                    },
//                    'item@list': {
//                        templateUrl: '/partials/partial-list-item.html',
//                        controller: 'ItemController'
//                    }
                }
            })
    });