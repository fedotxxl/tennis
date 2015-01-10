angular.module('app').
    config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/orders.new');

        $stateProvider
            .state('orders-new', {
                url: '/orders.new',
                templateUrl: '/admin/partials/partial-orders-new.html',
                controller: 'OrdersNewController',
                resolve: {
                    orders: function(_api) {
                        return _api.getOrders('new');
                    }
                }
            })
            .state('orders-approved', {
                url: '/orders.approved',
                templateUrl: '/admin/partials/partial-orders-new.html',
                controller: 'OrdersNewController',
                resolve: {
                    orders: function(_api) {
                        return _api.getOrders('approve');
                    }
                }
            })
            .state('orders-rejected', {
                url: '/orders.rejected',
                templateUrl: '/admin/partials/partial-orders-new.html',
                controller: 'OrdersNewController',
                resolve: {
                    orders: function(_api) {
                        return _api.getOrders('reject');
                    }
                }
            });

    });