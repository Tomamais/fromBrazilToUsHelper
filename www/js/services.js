angular.module('starter.services', [])

.factory('Locations', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var locations = [{
    id: 0,
    name: 'Boston',
    state: 'Massachussets',
    image: 'img/boston.jpg',
    latitude: 42.3134791,
    longitude: -71.1271969
  }, {
    id: 1,
    name: 'São Paulo',
    state: 'São Paulo',
    image: 'img/saopaulo.jpg',
    latitude: -23.6815315,
    longitude: -46.8754877
  }, {
    id: 2,
    name: 'Santiago',
    state: 'Santiago',
    image: 'img/santiago.jpg',
    latitude: -33.441411,
    longitude: -70.653822
  }, {
    id: 3,
    name: 'East Falmouth',
    state: 'Massachussets',
    image: 'img/eastfalmouth.jpg',
    latitude: 41.5733903,
    longitude: -70.5898785
  }];

  return {
    all: function() {
      return locations;
    },
    remove: function(location) {
      locations.splice(locations.indexOf(location), 1);
    },
    get: function(locationId) {
      for (var i = 0; i < locations.length; i++) {
        if (locations[i].id === parseInt(locationId)) {
          return locations[i];
        }
      }
      return null;
    }
  };
});
