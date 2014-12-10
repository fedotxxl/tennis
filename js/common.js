angular.module("app")
    .directive('pDropdown', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                items: "=",
                multi: "=",
                model: "=",
                key: "=",
                onItemClick: "="
            },
            templateUrl: '/templates/dropdown.html',
            link: function (scope, element, attrs) {
                var isDeselectable = true;

                var getValue = function() {
                    var value = scope.model[scope.key];

                    if (scope.multi && !value) {
                        value = [];
                        scope.model[scope.key] = value;
                    }

                    return value;
                };

                var setValue = function(key) {
                    var isActive = false;
                    var value = getValue();

                    if (scope.multi) {
                        if (_.contains(value, key)) {
                            value.remove(key);
                        } else {
                            value.push(key);
                            isActive = true;
                        }
                    } else {
                        if(isDeselectable && value == key) {
                            key = undefined; //allow to deselect
                        } else {
                            isActive = true;
                        }

                        scope.model[scope.key] = key;
                    }

                    return isActive;
                };

                scope.isChecked = function(item) {
                    var key = item.key;
                    var value = getValue();

                    if (scope.multi) {
                        return _.contains(value, key);
                    } else {
                        return getValue() == key;
                    }
                };

                scope.toggle = function($event, item) {
                    $event.stopPropagation();

                    var isActive = setValue(item.key);

                    scope.onItemClick(item, isActive, scope.multi);
                }
            }
        }
    });