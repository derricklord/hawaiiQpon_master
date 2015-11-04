(function () {
    'use strict';
    
    angular.module('your_app_name')
      .factory('Coupons', function($http) {
        var host = 'https://hawaiiqpon.lordconsulting.net';
        return {
          getCoupon: function(id) {
            return $http.get(host +'/api/coupons/'+id);
          },
          getCoupons: function(){
            return $http.get(host+'/api/coupons/all');
          }      
        };
      });
})();  