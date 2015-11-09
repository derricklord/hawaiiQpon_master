angular.module('your_app_name.app.controllers')
.controller('couponCtrl', function($scope, Coupons, Settings,  $cordovaGeolocation, $ionicLoading, $ionicModal, AuthService, $ionicBackdrop, $state) {

  //this will represent our logged user
  var user = {
    about: "Design Lead of Project Fi. Love adventures, green tea, and the color pink.",
    name: "Derrick Lord",
    picture: "https://lh3.googleusercontent.com/-OTdpfY5F1P4/AAAAAAAAAAI/AAAAAAAAAAA/Z2CVWwGu1QM/photo.jpg?sz=46",
    _id: 0,
    followers: 345,
    following: 58
  };
  
  var map;
  var host = 'http://hawaiiqpon.lordconsulting.net/uploads';


  //Controller Properties
  AuthService.saveUser(user);
  $scope.loggedUser = user;
  $scope.allCoupons = [];
  $scope.filteredCoupons = [];
  $scope.coupons = [];
  $scope.premiumCoupons = [];
  $scope.offer = {};
  
  //Controller Methods
  $scope.setFilter = setFilter;

  console.log(Settings);

  $scope.slider = {
    searchRadius: Settings.searchRadius,
    setFilter: Settings.setFilter,
    listView: Settings.listView
  };

  
  $scope.$watch('slider', function(){
    console.info('A Value has changed');
    Settings.searchRadius = $scope.slider.searchRadius;
    Settings.setFilter = $scope.slider.setFilter;
    Settings.listView = $scope.slider.listView;
  }, true);
  
  
   
  //Show Loading Message
  $ionicLoading.show({
    template: 'Finding Deals...'
  });
  
  
  //Setup Offers Modal Window
  $ionicModal.fromTemplateUrl('views/app/coupons/coupon-offer.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.showList = function(){
        $scope.slider.listView = true;
        $state.go('app.shop.sale');
  };
  
  $scope.showMap = function(){
        $scope.slider.listView = false;
        console.log($scope.slider.listView);
        $state.go('app.shop.popular');
  };

  
  $scope.updateCoupons = function(){
        Coupons.getCoupons().then(function(coupons){   
            
              coupons.data.coupons.forEach(function(coupon){
                  coupon.locations.forEach(function(location){
                      var locDistance = calcDistance($scope.myLoc.lat, $scope.myLoc.long, location.loc.lat, location.loc.long, 'N');
                      location.distance = locDistance;
                      
                      location.desc = coupon.desc;
                      location.desc2 = coupon.desc2;
                      location.expiration = coupon.expiration;
                      location.owner = coupon.owner;
                      location.premium = coupon.premium;
                      location.title = coupon.title;
                      location.vendor = coupon.vendor;
                      location.vendor_url = coupon.vendor_url;
                      location.vendor_phone = coupon.vendor_phone;
                      location.promo_code = coupon.promo_code;
                      
                      if(coupon.img){
                          location.img = host + '/' + coupon.img;
                      }else{
                          location.img = 'img/twlogo.png'
                      }
                      
                      location.launch = "window.open('" + location.vendor_url + "', '_system', 'location=yes'); return false;"
                      
                      
                      
                      if(coupon.category){
                        location.category = coupon.category;
                        location.icon = '/img/markers/' + coupon.category + '.png';
                      }else{
                        location.category = 'General';
                        location.icon = '/img/markers/General.png';
                      }
                      
                      
                      $scope.allCoupons.push(location);
                      
                      if(location.distance <= parseInt(Settings.searchRadius) && !location.premium){
                             $scope.coupons.push(location);
                      }

                      if(location.distance  <= parseInt(Settings.searchRadius) && location.premium){
                             $scope.premiumCoupons.push(location);
                      }                     
                  });
              });

              $ionicLoading.hide();   
        });
  };
  


  $scope.init = function(){
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
          console.log($scope.slider);
          $scope.updateCoupons();
      }, function(err){
            // error
      });
   };

     $scope.refresh = function(){
      $scope.coupons = [];
      $scope.premiumCoupons = [];
       $scope.$broadcast('scroll.refreshComplete');
       $scope.updateCoupons();
     }
 
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
    
    $scope.launch = function(url){
        window.open(url, '_system', 'location=yes'); 
        return false;
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
    
    $scope.$on('mapInitialized', function(evt, evtMap){
        map = evtMap;   
          $scope.moveMap = function(location){
            map.setZoom(9);
            map.setCenter(location);
            
          }       
      });
    
  function setFilter(filter){
    $scope.filter = filter;
    console.log($scope.filter);
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
 
 
 
  $scope.init(); 
   
})
