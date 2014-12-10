angular.module("common").
    directive("pOnClickOutside", function ($rootScope) {
        var ids = 0;

        $(window.document).click(function (e) {
            $rootScope.$safeApply(function() {
                $rootScope.$emit('on-click-outside', e.originalEvent.onClickOutsideId);
            })
        });

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var id = ids++;

                $rootScope.$on('on-click-outside', function (e, onClickOutsideId) {
                    if (onClickOutsideId != id) {
                        scope[attrs.pOnClickOutside]();
                    }
                });

                element.click(function (e) {
                    e.originalEvent.onClickOutsideId = id;
                })
            }
        }
    });