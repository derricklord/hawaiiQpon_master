angular.module('your_app_name.app.controllers')
.controller('couponCtrl', function($scope, ShopService, Coupons, $cordovaGeolocation) {
  //var posOptions = {timeout: 6000, enableHighAccuracy: true};
  $scope.coupons = [];
  $scope.premiumCoupons = [];
  $scope.filterText = '';
  $scope.setFilter = setFilter;


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
                      
                      if(location.distance < 25 && !location.premium){
                             $scope.coupons.push(location);
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
                      
                  });
              });
             //$scope.coupons = coupons.data.coupons;
            
          });      
    }, function(err){
          // error
    });

  
  
  //$scope.products = [];
 // $scope.popular_products = [];

    
    /*
  Coupons.getCoupons().then(function(coupons){
    
    coupons.data.coupons.forEach(function(coupon){
         coupon.locations.forEach(function(location){
            var locDistance = calcDistance($scope.myLoc.lat, $scope.myLoc.long, location.loc.lat, location.loc.long, 'N');
            location.distance = locDistance;
         });
    });
    $scope.coupons = coupons.data.coupons;
    
  });
  */
  /*
  ShopService.getProducts().then(function(products){
    $scope.products = products;
  });



  ShopService.getProducts().then(function(products){
    $scope.popular_products = products.slice(0, 2);
  });
  */
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
