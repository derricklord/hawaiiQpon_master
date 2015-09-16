(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope','$auth', '$state'];

    /* @ngInject */
    function loginCtrl($scope, $auth, $state){
        
        

        $scope.user = {
          email: $scope.email,
          password: $scope.password
        };

        
        $scope.login = function() {
          $auth.login({ email: $scope.email, password: $scope.password })
            .then(function() {

            })
            .catch(function(response) {

            });
        };

        
        
        $scope.authenticate = function(provider) {
          $auth.authenticate(provider)
            .then(function(data) {      
               $state.go('home');
            })
            .catch(function(response) {
                //console.log(response);
            });
        };
    }
})();