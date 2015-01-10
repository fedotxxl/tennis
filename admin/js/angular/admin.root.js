angular.module('app').
    controller('RootController', function($scope, _api) {
        _api.getUser().then(function(user) {
            $scope.user = user;
        });

        $scope.getLocation = function(id) {
            if ($scope.user) {
                return _.find($scope.user.locations, function(location) {
                    return location.id == id;
                })
            } else {
                return null;
            }
        }
    });