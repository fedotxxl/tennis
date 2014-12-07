angular.module('app').
    controller('ListController', function($rootScope, $scope, $stateParams) {
        console.log("abc");
        $rootScope.shared = {filter: $stateParams.filter, item: $stateParams.item}
    }).
    controller('FilterController', function($scope, $rootScope, _data, _filter) {
        var loadItems = function() {
            $scope.loading = true;
            _data.getList(_filter.toCheckedObject()).then(function(items) {
                $scope.items = items;
                $scope.loading = false;
            });
        };

        loadItems();

        $rootScope.$watch('shared.filter', function (current, prev) {
                if (current != prev) {
                    _filter.fromUrl(current)
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
        var loadItem = function() {
            if ($rootScope.shared && $rootScope.shared.item) {
                $scope.loading = true;
                _data.getItem($rootScope.shared.item).then(function(item) {
                    $scope.item = item;
                    $scope.loading = false;
                });
            }
        };

        loadItem();

        $rootScope.$watch('shared.item', function (current, prev) {
                if (current != prev) {
                    loadItem();
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
                        controller: 'ListController'
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