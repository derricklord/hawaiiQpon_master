(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('editCtrl', editCtrl);

    editCtrl.$inject = ['$scope', 'Coupons', '$state', '$stateParams'];

    /* @ngInject */
    function editCtrl($scope, Coupons, $state, $stateParams){
        //Page Variables
        var id = $stateParams.id
        
        $scope.location = '';
        $scope.places = [];
        $scope.coupon = {};
        $scope.init = init;
        

        //Initialize
        function init(){
            Coupons.getCoupon(id)
                .success(function(data){
                    $scope.coupon = data;
                    console.log($scope.coupon);
                })
                .error(function(){
                    console.log(error);
                })
        };
        
        
        
        //Address Configuration
        $scope.showAddress = false;
        $scope.addressButton = 'Add Address';
        $scope.toggleAddress =  function(){
            $scope.showAddress = !$scope.showAddress;
        };
        
        
        $scope.removeLocation = function($index){
            $scope.coupon.locations.splice($index, 1);
        };
        
        
        //Dropzone Configuration
        $scope.showDropzone = false;
        $scope.fileAdded = false;
        $scope.partialDownloadLink = 'http://localhost:3000/uploads/';
        $scope.filename = '';

        
        $scope.toggleDropzone =  function(){
            $scope.showDropzone = !$scope.showDropzone;
        };
        $scope.uploadFile = function() {
            $scope.processQueue();
        };

        $scope.reset = function() {
            $scope.resetDropzone();
            $scope.coupon.img = '';
            $scope.coupon.hasImage = false;
        };
        
        //Save Coupon
        $scope.saveCoupon = function(){
            Coupons.updateCoupon($scope.coupon)
                .success(function(data){
                    
                })
                .error(function(error){
                    
                })
        }
        
        $scope.init();
    }
})();