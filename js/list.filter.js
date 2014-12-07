angular.module("app")
    .factory('_filter', function () {
        var items = [];
        var addPossibleItem = function(title, key, selection, multi) {
            items.push({
                title: title,
                key: key,
                selection: selection,
                multi: multi,
                getChecked: function() {
                    return _.filter(this.selection, function(item) {
                        return item.checked;
                    })
                },
                getCheckedKeys: function() {
                    return _.map(this.getChecked(), function(item) { return item.key })
                },
                getTitle: function() {
                    var checked = this.getChecked();
                    if (checked.length) {
                        return _.map(checked, function(item) { return item.title }).join(", ");
                    } else {
                        return this.title;
                    }
                },
                toUrl: function() {
                    var value = null;

                    if (this.selection) {
                        return this.getCheckedKeys().join("+");
                    } else if (this.checked) {
                        value = "1";
                    }

                    if (value) {
                        return this.key + ":" + value + ";"
                    } else {
                        return "";
                    }
                }
            })
        };

        var toUrl = function() {
            var answer = "";

            _.each(items, function(item) {
                answer += item.toUrl();
            });

            return answer;
        };

        var fromUrl = function() {
            console.log("loading from url")
        };

        var toCheckedObject = function() {
            var answer = {};

            _.each(items, function(item) {
                var value = null;

                if (item.selection) {
                    value = item.getChecked();
                } else if (item.checked) {
                    value = true;
                }

                if (value) {
                    answer[item.key] = value;
                }
            });

            return answer;
        };

        addPossibleItem("Цена", "price", [{key: '1', title: "x"}, {key: "2", title: "xx"}, {key: "3", title: "xxx"}], true);
//        addPossibleItem("Рейтинг", "rating", ["1", "2", "3"]);
        addPossibleItem("Парковка", "parking");
//        addPossibleItem("Кредитные карты", "credit");

        return {
            toUrl: toUrl,
            fromUrl: fromUrl,
            toCheckedObject: toCheckedObject,
            getPossibleItems: function() {
                return items;
            }
        }
    })
    .directive('pFilterButtons', function (_filter) {
        return {
            restrict: 'E',
            replace: true,
            template: '<p-filter-button filter-item="filterItem" ng-repeat="filterItem in filterItems"/>',
            link: function (scope, element, attrs) {
                scope.filterItems = _filter.getPossibleItems()
            }
        }
    })
    .directive('pFilterButton', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/filter-button.html',
            scope: {
                filterItem: '='
            },
            link: function (scope, element, attrs) {
                var filterItem = scope.filterItem;

                scope.toggle = function() {
                    if (filterItem.selection) {
                        scope.isDropdownActive = !scope.isDropdownActive;
                    } else {
                        filterItem.checked = !filterItem.checked;
                    }
                };

                scope.onSelectionItemClick = function(item) {
                    if (!scope.filterItem.multi && item.checked) {
                        scope.isDropdownActive = false;
                    }
                };
            }
        }
    });