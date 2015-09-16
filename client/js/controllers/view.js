(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('viewCtrl', viewCtrl);

    viewCtrl.$inject = ['$scope', 'Coupons', '$stateParams'];

    /* @ngInject */
    function viewCtrl($scope, Coupons, $stateParams){
        //Page Variables
        var id = $stateParams.id;
        $scope.coupon = {};
        $scope.init = init;
        
        //Initialize
        function init(){
            Coupons.getCoupon(id)
                .success(function(data){
                    $scope.coupon = data;
                })
                .error(function(){
                    console.log(error);
                })
        };
        
        $scope.init();
    }
})();