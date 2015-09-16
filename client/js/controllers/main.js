(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope','$auth', '$state'];

    /* @ngInject */
    function mainCtrl($scope, $auth, $state){
 
        $scope.isAuthenticated = isAuthenticated;
        $scope.logout = logout;
        
        function logout(){
            $auth.logout();
            $state.go('login');
            
        };
        
        
        function isAuthenticated() {
          return $auth.isAuthenticated();
        };
        
        
    
    }
})();