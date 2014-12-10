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

        addPossibleItem("Цена", "price", [{key: '1', title: "x"}, {key: "2", title: "xx"}, {key: "3", title: "xxx"}], true);
        addPossibleItem("Рейтинг", "rating", [{key: "1", title: "От 1"}, {key: "2", title: "От 2"}, {key: "3", title: "От 3"}]);
        addPossibleItem("Парковка", "parking");
        addPossibleItem("Кредитные карты", "credit");

        return {
            getPossibleItems: function() {
                return items;
            }
        }
    })
    .directive('pFilterButtons', function (_filter) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                filterModel: "="
            },
            template: '<p-filter-button filter="filterAndModel.filter" model="filterAndModel.model" ng-repeat="filterAndModel in filterAndModelItems"/>',
            link: function (scope, element, attrs) {
                scope.filterAndModelItems = _.map(_filter.getPossibleItems(), function(filterItem) {
                    return {
                        filter: filterItem,
                        model: scope.filterModel
                    }
                });


                scope.filterItems = _filter.getPossibleItems();
            }
        }
    })
    .directive('pFilterButton', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/filter-button.html',
            scope: {
                filter: '=',
                model: "="
            },
            link: function (scope, element, attrs) {
                var filterItem = scope.filter;
                var model = scope.model;

                var getValues = function() {
                    return model[filterItem.key];
                };

                var setValues = function(values) {
                    model[filterItem.key] = values;
                };

                scope.isChecked = function() {
                    return !filterItem.selection && getValues();
                };

                scope.toggle = function() {
                    if (filterItem.selection) {
                        scope.isDropdownActive = !scope.isDropdownActive;
                    } else {
                        setValues(!getValues());
                    }
                };

                scope.onSelectionItemClick = function(item, isActive, multi) {
                    if (!multi && isActive) {
                        scope.isDropdownActive = false;
                    }
                };
            }
        }
    });