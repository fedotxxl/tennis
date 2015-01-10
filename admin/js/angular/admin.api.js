angular.module('app').
    factory('_api', function($timeout) {
        var getOrders = function(state) {
            var getOrder = function(persons, comment) {
                return {
                    action: (state == 'new') ? null : state,
                    created: Date.now() - 1000*60*60,
                    date: Date.now(),
                    persons: persons,
                    comment: comment,
                    answer: {}
                }
            };

            return $timeout(function() {
                return [
                    getOrder(1),
                    getOrder(2, "Обязательна парковка")
                ];
            }, 1000)
        };

        var getUser = function () {
            return $timeout(function () {
                return {
                    name: "Fedor Belov",
                    locations: [
                        {id: 1, label: "Location 1"},
                        {id: 2, label: "Location 2"}
                    ]
                }
            }, 500);
        };

        var submitAnswer = function(order, action) {
            return $timeout(function() {

            }, 1500);
        };

        return {
            getOrders: getOrders,
            getUser: getUser,
            submitAnswer: submitAnswer
        }
    });