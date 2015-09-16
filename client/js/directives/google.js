(function () {
    'use strict';

    angular
        .module('coupon')
        .directive('googlePlaces', googlePlaces);

    googlePlaces.$inject = [];

    /* @ngInject */
    function  googlePlaces() {

        var directive = {
            replace: true,
            link: link,
            restrict: 'E',
            templateUrl: '../../views/address.html',
            scope: {
                location:'=',
                places: '=',
                coupon: '='
            }
        };
        return directive;

        function link($scope, elm, attrs) {
                var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    var place = autocomplete.getPlace();
                    $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                    $scope.coupon.locations.push({
                        url: place.url,
                        place_id: place.place_id,
                        locality: place.locality,
                        address: place.formatted_address,
                        loc: {
                            lat: place.geometry.location.lat(),
                            long: place.geometry.location.lng()
                        }
                    });
                    $scope.$apply(function(){
                        $("#google_places_ac")[0].value = '';
                    });
                });       
        }
    }

})();