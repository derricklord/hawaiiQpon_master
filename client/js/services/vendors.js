(function () {
    'use strict';
    
    angular.module('coupon')
      .factory('Vendors', function($http) {
        return {
          getVendor: function(id) {
            return $http.get('/api/vendors/'+id);
          },
          getVendors: function(){
            return $http.get('/api/vendors');
          },
          myVendors: function(){
            return $http.get('/api/vendors/my');  
          },
          postVendor: function(pageData) {
            return $http.post('/api/vendors', pageData);
          },
          deleteVendor: function(id){
            return $http.delete('/api/vendors/'+id);
          },
          updateVendor: function(vendorData) {
            return $http.put('/api/vendors/'+vendorData._id, vendorData);
          },       
        };
      });
})();   