angular.module("app")
    .directive('pDropdown', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                items: "=",
                multi: "=",
                onItemClick: "="
            },
            templateUrl: '/templates/dropdown.html',
            link: function (scope, element, attrs) {
                scope.toggle = function($event, item) {
                    $event.stopPropagation();

                    item.checked = !item.checked;

                    if (!scope.multi && item.checked) {
                        _.each(scope.items, function(current) {
                            if (current != item) current.checked = false;
                        });
                    }

                    scope.onItemClick(item);
                }
            }
        }
    });