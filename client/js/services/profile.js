(function () {
    'use strict';
    
    angular.module('coupon')
      .factory('Profile', function($http) {
        return {
          getProfile: function() {
            return $http.get('/api/profile/');
          },
          updateProfile: function(profileData) {
            return $http.put('/api/profile/', profileData);
          },       
        };
      });
})();  