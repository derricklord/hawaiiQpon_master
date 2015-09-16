(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope','Coupons', 'Profile'];

    /* @ngInject */
    function homeCtrl($scope, Coupons, Profile){
        $scope.init = init;
        $scope.delete = deleteCoupon;    
        $scope.isAuthenticated = isAuthenticated;
        $scope.logout = logout;


        
        function logout(){
            $auth.logout();
        };
        
        
        function isAuthenticated() {
          return $auth.isAuthenticated();
        };
             
        
        function init(){
            Coupons.getCoupons()
                .success(function(data){
                    $scope.coupons = data.coupons;
                })
                .error(function(error){
                    console.log(error);
                });
            
            Profile.getProfile()
                .success(function(data){
                    $scope.profile = data;
                })
                .error(function(error){
                    console.log(error);
                });
        };
        
        function deleteCoupon(id){
            Coupons.deleteCoupon(id)
                .success(function(data){
                    $scope.init();
                })
                .error(function(error){
                    console.log(error);
                })
        };
        
        
        init();
    }
})();