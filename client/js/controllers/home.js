(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope','Coupons', 'Profile', '$modal'];

    /* @ngInject */
    function homeCtrl($scope, Coupons, Profile, $modal){
        $scope.init = init;
        $scope.delete = deleteCoupon;    
        $scope.isAuthenticated = isAuthenticated;
        $scope.logout = logout;
        $scope.admin = true;
        $scope.owned = '';
        $scope.checkExpiration = checkExpiration;
        $scope.setOwned = setOwned;
        
        function setOwned(owner){
            if(owner === $scope.owned){
                $scope.owned = '';
                console.log($scope.owned);
            }else{
                $scope.owned = owner;
                console.log($scope.owned);
            }
        };
        

        function checkExpiration(date){
          //console.log(date);  
          return true;  
        };

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
                    //console.log(data);
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