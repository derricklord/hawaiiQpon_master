(function () {
    'use strict';
    angular.module('coupon')
    .config(configuration)

    configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configuration ($stateProvider, $urlRouterProvider) {
      //
      // For any unmatched url, redirect to /state1

    }
})();

