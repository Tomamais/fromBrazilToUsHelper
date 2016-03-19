angular.module('starter.services', [])

  .factory('Weather', function () {
    var getFfromC = function (number){
      return Number.parseFloat((number * 1.8 + 32).toFixed(2))
    }

    var getCfromF = function (number){
     return Number.parseFloat(((number - 32) / 1.8).toFixed(2)) 
    }  
    
    return {
      getCfromF: getCfromF,
      getFfromC: getFfromC
    };
  })
  
  .factory('Locations', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var locations = [{
        id: 0,
        name: 'My Location',
        state: '',
        image: 'img/locationpin.png',
        temperature: {
          celsius: 0,
          fahrenheit: 0,
          updated: false
        },
        latitude: 0,
        longitude: 0
      }, {
        id: 5,
        name: 'Waterfront',
        state: 'Pennsylvania',
        image: 'img/waterfront.jpg',
        temperature: {
          celsius: 0,
          fahrenheit: 0,
          updated: false
        },
        latitude: 40.4123831,
        longitude: -79.9150437
      }, {
        id: 6,
        name: 'Cranberry',
        state: 'Pennsylvania',
        image: 'img/cranberry.jpg',
        temperature: {
          celsius: 0,
          fahrenheit: 0,
          updated: false,
          updatedAt: Date.now()
        },
        latitude: 40.6801906,
        longitude: -80.0929766
    }, {
        id: 1,
        name: 'Boston',
        state: 'Massachussets',
        image: 'img/boston.jpg',
        temperature: {
          celsius: 0,
          fahrenheit: 0,
          updated: false,
          updatedAt: Date.now()
        },
        latitude: 42.3134791,
        longitude: -71.1271969
      }, {
        id: 2,
        name: 'São Paulo',
        state: 'São Paulo',
        image: 'img/saopaulo.jpg',
        temperature: {
          celsius: 0,
          fahrenheit: 0,
          updated: false,
          updatedAt: Date.now()
        },
        latitude: -23.6815315,
        longitude: -46.8754877
      }, {
        id: 3,
        name: 'Santiago',
        state: 'Santiago',
        image: 'img/santiago.jpg',
        temperature: {
          celsius: 0,
          fahrenheit: 0,
          updated: false,
          updatedAt: Date.now()
        },
        latitude: -33.441411,
        longitude: -70.653822
      }, {
        id: 4,
        name: 'East Falmouth',
        state: 'Massachussets',
        image: 'img/eastfalmouth.jpg',
        temperature: {
          celsius: 0,
          fahrenheit: 0,
          updated: false,
          updatedAt: Date.now()
        },
        latitude: 41.5733903,
        longitude: -70.5898785
      }];

    return {
      all: function () {
        return locations;
      },
      remove: function (location) {
        locations.splice(locations.indexOf(location), 1);
      },
      get: function (locationId) {
        for (var i = 0; i < locations.length; i++) {
          if (locations[i].id === parseInt(locationId)) {
            return locations[i];
          }
        }
        return null;
      }
    };
  })

  .factory('weatherService', ['$http', '$q', function ($http, $q) {
    function getWeather(lat, long) {
      var deferred = $q.defer();
      $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=6b6e14e5f8f8f60af72756d1f728c70b')
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    return {
      getWeather: getWeather,
    };
  }
  ]);
