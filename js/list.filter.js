angular.module("app")
    .factory('_filter', function () {
        var items = [];
        var addPossibleItem = function(title, key, selection, multiple) {
            items.push({
                title: title,
                key: key,
                selection: selection,
                multiple: multiple
            })
        };

        addPossibleItem("Цена", "price", ["1", "2", "3"]);
//        addPossibleItem("Рейтинг", "rate", ["1", "2", "3"]);
//        addPossibleItem("Парковка", "parking");
//        addPossibleItem("Кредитные карты", "credit");

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
                console.log(scope.filterItem)
            }
        }
    });