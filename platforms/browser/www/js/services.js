angular.module('starter.services', [])

.factory('Locations', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var locations = [{
    id: 0,
    name: 'Boston',
    state: 'Massachussets',
    face: 'img/boston.jpg'
  }, {
    id: 1,
    name: 'São Paulo',
    state: 'São Paulo',
    face: 'img/saopaulo.jpg'
  }, {
    id: 2,
    name: 'Santiago',
    state: 'Santiago',
    face: 'img/santiago.jpg'
  }, {
    id: 3,
    name: 'East Falmouth',
    state: 'Massachussets',
    face: 'img/eastfalmouth.jpg'
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
