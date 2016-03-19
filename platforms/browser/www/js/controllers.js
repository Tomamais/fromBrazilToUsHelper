angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $cordovaGeolocation, $ionicLoading, $stateParams, Locations, Weather, weatherService, $ionicPopup) {
    // variables
    $scope.weather = {};
    $scope.weather.celsius = -17.78;
    $scope.weather.fahrenheit = 0;
    $scope.weather.min = 0;
    $scope.weather.max = 100;
    $scope.location = {};
    $scope.locationId = -1;
  
    // tab events
    $scope.$on('$ionicView.enter', function () {
      // do something before enter
      if ($stateParams.locationId != $scope.locationId) {
        $scope.locationId = $stateParams.locationId;
        $scope.location = Locations.get($stateParams.locationId);
      
        // location context
        var posOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };

        if ($stateParams.locationId != 0) {
          showLoading('Acquiring location...');
          
          setMapAndLocation($scope.location.latitude, $scope.location.longitude);
          $ionicLoading.hide();
        }
        else {
          // wait for device get ready due the geoLocation request
          ionic.Platform.ready(function () {
            showLoading('Acquiring location...');
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
              setMapAndLocation(position.coords.latitude, position.coords.longitude);
              $ionicLoading.hide();

            }, function (err) {
              $ionicLoading.hide();
              $ionicPopup.alert({ title: 'Ops!', template: 'Can\'t get your location' });
              console.log(err);
            });
          });
        }
      }
    });
  
    // add a loading modal on the top of screen
    var showLoading = function (message) {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>' + message + ''
      });
    };

    function setMapAndLocation(lat, long) {
      var myLatlng = new google.maps.LatLng(lat, long);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };          
      
      // elements    
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var currentLocation = document.getElementById("currentLocation");
      $scope.map = map;

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
            
            // the weather
            showLoading('Acquiring weather information...');
            weatherService.getWeather(lat, long).then(function(data) {
              $scope.weather.celsius = Number.parseFloat((data.main.temp - 273).toFixed(2));
              $scope.weather.fahrenheit = Weather.getFfromC($scope.weather.celsius);
              $scope.location.temperature.updated = true;
              $scope.location.temperature.celsius = $scope.weather.celsius;
              $scope.location.temperature.fahrenheit = $scope.weather.fahrenheit;
              $scope.location.temperature.lastUpdate = Date.now();
            })
            .catch(function(err) {
              $ionicPopup.alert({ title: 'Ops!', template: 'Can\'t get the Weather!' });
            })
            .finally(function(){
              $ionicLoading.hide(); 
            });
            
            // console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
            currentLocation.innerText = "City: " + city + ", Country: " + country;
          }
        }
      });
    };
  
    // input events
    $scope.change = function () {
      $scope.weather.celsius = Weather.getCfromF($scope.weather.fahrenheit);
    };

    $scope.changeCelsius = function () {
      $scope.weather.fahrenheit = Weather.getFfromC($scope.weather.celsius);
    };
  })

  .controller('LocationsCtrl', function ($scope, Locations, weatherService) {
    $scope.locations = Locations.all();
    $scope.remove = function (location) {
      Locations.remove(location);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
