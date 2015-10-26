(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('newCtrl', newCtrl);

    newCtrl.$inject = ['$scope', 'Coupons', 'Vendors', '$state'];

    /* @ngInject */
    function newCtrl($scope, Coupons, Vendors, $state){
        //Page Variables
        $scope.location = '';
        $scope.places = [];
        $scope.coupon = {
            title: '',
            desc: '',
            desc2: '',
            code: '',
            footer: '',
            active: false,
            hasImage: false,
            img: '',
            category:[],
            locations: [],
            expiration: new Date(),
            expires: true,
            premium:false,
            vendor: '',
            vendorInfo:{}
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
            Coupons.postCoupon($scope.coupon)
                .success(function(data){
                    $state.go('home');
                })
                .error(function(error){
                    $state.go('home');
                })
        }
        
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
    }
})();