(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('vendorCtrl', vendorCtrl);

    vendorCtrl.$inject = ['$scope',  'Vendors', '$state'];

    /* @ngInject */
    function vendorCtrl($scope,  Vendors, $state){
        //Page Variables

        $scope.vendor = {
            name: '',
            website: '',
            phone: '',
            logo: ''
        };
        
        
        //Dropzone Configuration
        //$scope.showDropzone = false;
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
            $scope.vendor.logo = '';
            $scope.filename = '';
        };
        
        //Save Vendor
        $scope.saveVendor = function(){
            Vendors.postVendor($scope.vendor)
                .success(function(data){
                    $state.go('home');
                })
                .error(function(error){
                    $state.go('home');
                })
        }
        
        /*
        function init(){
            Vendors.getVendors()
                .success(function(data){
                    $scope.vendors = data;
                })
                .error(function(error){
                    console.log(error);
                });
            
        };
        
        init();
        */
    }
})();