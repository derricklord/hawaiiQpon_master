(function () {
    'use strict';

    angular
        .module('coupon')
        .directive('showtab', function() {
                return {
                    restrict: 'A',
                    link: function(scope, element, attrs) {
                        element.click(function(e) {
                            e.preventDefault();
                            $(element).tab('show');
                        });
                    }
                }
            });

})();