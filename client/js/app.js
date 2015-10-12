(function () {
    'use strict';
     angular.module('coupon', ['ui.router', 'satellizer', 'mgcrea.ngStrap', 'datatables'])
            .config(configuration)

            configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider'];

            /* @ngInject */
            function configuration ($stateProvider, $urlRouterProvider, $authProvider) {
                $urlRouterProvider.otherwise("/");
                $stateProvider
                
                    // Home page
                    .state('home', {
                        url: "/",
                        templateUrl: "views/home.html",
                        controller: 'homeCtrl',
                        resolve: {
                          loginRequired: loginRequired
                        }
                    })                
                    // New Coupon page
                    .state('new', {
                        url: "/new",
                        templateUrl: "views/new.html",
                        controller: 'newCtrl',
                        resolve: {
                          loginRequired: loginRequired
                        }                   
                    })
                    // Edit Coupon page
                    .state('edit', {
                        url: "/edit/:id",
                        templateUrl: "views/edit.html",
                        controller: 'editCtrl',
                        resolve: {
                          loginRequired: loginRequired
                        }                   
                    })  
                    // View Coupon page
                    .state('view', {
                        url: "/view/:id",
                        templateUrl: "views/view.html",
                        controller: 'viewCtrl',
                        resolve: {
                          loginRequired: loginRequired
                        }                   
                    })                   
                    // Login page
                    .state('login', {
                        url: "/login",
                        templateUrl: "views/login.html",
                        controller: 'loginCtrl'
                    });
                
                     // Google
                    $authProvider.google({
                      url: '/auth/google',
                      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
                      clientId: '559791642689-2gu035p3i1sv05na3274rp46fn9rke2e.apps.googleusercontent.com',  /*DEV*/   
                      scope: ['profile', 'email'],
                      scopePrefix: 'openid',
                      scopeDelimiter: ' ',
                      requiredUrlParams: ['scope'],
                      optionalUrlParams: ['display'],
                      display: 'popup',
                      type: '2.0',
                      popupOptions: { width: 580, height: 400 }
                    });               

                    // Facebook
                    $authProvider.facebook({
                      url: '/auth/facebook',
                      authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
                      redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
                      clientId: '473241659523030',  
                      requiredUrlParams: ['display', 'scope'],
                      scope: ['email'],
                      scopeDelimiter: ',',
                      display: 'popup',
                      type: '2.0',
                      popupOptions: { width: 580, height: 400 }
                    });
                
                   function skipIfLoggedIn($q, $auth) {
                      var deferred = $q.defer();
                      if ($auth.isAuthenticated()) {
                        deferred.reject();
                      } else {
                        deferred.resolve();
                      }
                      return deferred.promise;
                    }

                    function loginRequired($q, $location, $auth) {
                      var deferred = $q.defer();
                      if ($auth.isAuthenticated()) {
                        deferred.resolve();
                      } else {
                        $location.path('/login');
                      }
                      return deferred.promise;
                    }

            };
})();