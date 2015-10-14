angular.module('your_app_name.app.controllers')
.controller('couponCtrl', function($scope, ShopService, Coupons, $cordovaGeolocation, $ionicLoading, $ionicModal) {
  //var posOptions = {timeout: 6000, enableHighAccuracy: true};
  $scope.coupons = [];
  $scope.offer = {};
  $scope.premiumCoupons = [];
  $scope.filter = '';
  $scope.radius = 25;
  
    $ionicLoading.show({
      template: 'Finding Deals...'
    });


  $cordovaGeolocation
    .getCurrentPosition({timeout: 6000, enableHighAccuracy: true})
    .then(function (position) {
        
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        $scope.map = { center: { latitude: lat, longitude: long}, zoom: 8 }; 
        $scope.myLoc = {
          lat:lat,
          long: long
        }

    }, function(err) {
         // error
    })
    .then(function(){
       
        Coupons.getCoupons().then(function(coupons){   
              coupons.data.coupons.forEach(function(coupon){
                  coupon.locations.forEach(function(location){
                      var locDistance = calcDistance($scope.myLoc.lat, $scope.myLoc.long, location.loc.lat, location.loc.long, 'N');
                      location.distance = locDistance;
                      
                      location.desc = coupon.desc;
                      location.expiration = coupon.expiration;
                      location.owner = coupon.owner;
                      location.premium = coupon.premium;
                      location.title = coupon.title;
                      location.vendor = coupon.vendor;
                      
                      if(coupon.category){
                        location.category = coupon.category;
                      }else{
                        location.category = 'General'
                      }
                      
                      switch(coupon.category){
                          case 'Attraction':
                            location.icon = 'ion-map';
                            break;
                          case 'Service':
                            location.icon = 'ion-person-stalker';
                            break;
                          case 'Dining':
                            location.icon = 'ion-wineglass';
                            break;
                          case 'Entertainment':
                            location.icon = 'ion-music-note';
                            break;
                          case 'Shopping':
                            location.icon = 'ion-cash';
                            break;
                          default:
                            location.icon = 'ion-location';
                      }
                      
                      
                      if(location.distance < $scope.radius && !location.premium){
                             $scope.coupons.push(location);
                      }

                      if(location.distance < $scope.radius && location.premium){
                             $scope.premiumCoupons.push(location);
                      }                     
                  });
              });
               
              $ionicLoading.hide();
          });      
    }, function(err){
          // error
    });

    $ionicModal.fromTemplateUrl('views/app/coupons/coupon-offer.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
  
    $scope.openOffer = function(coupon) {
      $scope.offer = coupon;
      $scope.modal.show();
    };
    

    $scope.openMapOffer = function(event, coupon) {
      $scope.offer = coupon;
      $scope.modal.show();
    };   
    
    $scope.closeOffer = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  






  function setFilter(filter){
    $scope.filter = filter;
  };
  
  function calcDistance(lat1, lon1, lat2, lon2, unit) {
          var radlat1 = Math.PI * lat1/180;
          var radlat2 = Math.PI * lat2/180;
          var radlon1 = Math.PI * lon1/180;
          var radlon2 = Math.PI * lon2/180;
          var theta = lon1-lon2;
          var radtheta = Math.PI * theta/180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = dist * 60 * 1.1515;
          if (unit=="K") { dist = dist * 1.609344 };
          if (unit=="N") { dist = dist * 0.8684 };
          return Math.round(dist*100)/100;
  } 
   
})
