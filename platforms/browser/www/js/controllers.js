angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation, $ionicLoading) {

  $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
  });
  ionic.Platform.ready(function(){ 
    $scope.weather = {};
    $scope.weather.celsius = -17.78;
    $scope.weather.fahrenheit = 0;
    $scope.weather.min = 0;
    $scope.weather.max = 100;
    $scope.location = {};
    $scope.location.latitude = 0;
    $scope.location.longitude = 0;
    
    // location context
    var posOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };
          
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
        
      var myLatlng = new google.maps.LatLng(lat, long);
        
      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };          
        
      // elements    
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
      var coords = document.getElementById("locationCoords");
      $scope.map = map;   
      $scope.location.latitude = lat;
      $scope.location.longitude = long;
      
      new google.maps.Geocoder().geocode({ 'latLng': myLatlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var country = null, countryCode = null, city = null, cityAlt = null;
            var c, lc, component;
            for (var r = 0, rl = results.length; r < rl; r += 1) {
              var result = results[r];

              if (!city && result.types[0] === 'locality') {
                for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                  component = result.address_components[c];

                  if (component.types[0] === 'locality') {
                    city = component.long_name;
                    break;
                  }
                }
              }
              else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
                for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                  component = result.address_components[c];

                  if (component.types[0] === 'administrative_area_level_1') {
                    cityAlt = component.long_name;
                    break;
                  }
                }
              } else if (!country && result.types[0] === 'country') {
                country = result.address_components[0].long_name;
                countryCode = result.address_components[0].short_name;
              }

              if (city && country) {
                break;
              }
            }
            console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
            coords.innerText = "City: " + city + ", Country: " + country;
          }
        }
      });
      
      $ionicLoading.hide();           
          
    }, function(err) {
        $ionicLoading.hide();
        console.log(err);
    });
    
    // input events
    $scope.change = function(){
      $scope.weather.celsius = Number.parseFloat((($scope.weather.fahrenheit - 32) / 1.8).toFixed(2));
    };
    
    $scope.changeCelsius = function(){
      $scope.weather.fahrenheit = Number.parseFloat(($scope.weather.celsius * 1.8 + 32).toFixed(2));
    };
  });
})

.controller('LocationsCtrl', function($scope, Locations) {

  $scope.locations = Locations.all();
  $scope.remove = function(location) {
    Locations.remove(location);
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
