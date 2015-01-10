angular.module('app').
    controller('OrdersNewController', function ($scope, orders, _api) {
        $scope.orders = orders;

        $scope.actionMessage = function (order, actionType) {
            if (order.priorAction == actionType) {
                return "Вы уверены?";
            } else {
                return $scope.actionMessageByType(actionType);
            }
        };

        $scope.actionMessageByType = function (actionType) {
            if (actionType == "approve") {
                return "Можем";
            } else if (actionType == "approve.partially") {
                return "Частично";
            } else if (actionType == "reject") {
                return "Не можем";
            }
        };

        $scope.getActionButtonClass = function (actionType) {
            if (actionType == "approve") {
                return 'btn-success';
            } else if (actionType == "approve.partially") {
                return 'btn-info';
            } else if (actionType == "reject") {
                return 'btn-danger';
            }
        };

        var doOrChangeActionStatus = function (order, acitonStatus, action) {
            if (order.priorAction == acitonStatus) {
                var hasError = $scope.hasCommentError(order) || $scope.hasLocationError(order);
                if (!hasError) {
                    if (action) {
                        action();
                    } else {
                        submitAnswer(order, acitonStatus);
                    }
                }
            } else {
                order.priorAction = acitonStatus;
            }
        };

        var submitAnswer = function (order, aciton) {
            order.submitting = true;
            _api.submitAnswer(order, aciton).then(function () {
                order.action = aciton;
                order.submitting = false;
            });
        };

        $scope.approve = function (order) {
            doOrChangeActionStatus(order, 'approve');
        };

        $scope.approvePartially = function (order) {
            doOrChangeActionStatus(order, 'approve.partially');
        };

        $scope.reject = function (order) {
            doOrChangeActionStatus(order, 'reject');
        };

        $scope.getLocationLabels = function (locations) {
            var answer = _.map(locations, function (id) {
                return $scope.getLocation(id).label;
            });

            return answer.join(", ")
        };

        $scope.hasCommentError = function (order) {
            return order.priorAction == 'approve.partially' && !order.answer.comment;
        };

        $scope.hasLocationError = function (order) {
            return  (order.priorAction == 'approve' || order.priorAction == 'approve.partially') &&
                (order.answer.locations == null || order.answer.locations.length == 0);
        };
    });