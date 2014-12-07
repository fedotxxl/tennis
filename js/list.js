angular.module('app').
    controller('ListController', function($rootScope, $scope, $stateParams) {
        $rootScope.shared = {filter: $stateParams.filter, item: $stateParams.item}
    }).
    controller('FilterController', function($scope, $rootScope) {
        $scope.items = ["1", "2"];
        $scope.listNow = Date.now();

        $rootScope.$watch('shared.filter', function (current, prev) {
                if (current != prev) {
                    $scope.anotherFilter = (current == 'a') ? 'b' : 'a';
                }
            }
        )
    }).
    controller('ItemController', function($scope) {

        $scope.itemNow = Date.now();
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