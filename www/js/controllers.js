angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.weather = {};
  $scope.weather.celsius = -17.78;
  $scope.weather.fahrenheit = 0;
  $scope.weather.min = 0;
  $scope.weather.max = 100;
  
  $scope.change = function(){
    $scope.weather.celsius = Number.parseFloat((($scope.weather.fahrenheit - 32) / 1.8).toFixed(2));
  };
  
  $scope.changeCelsius = function(){
    $scope.weather.fahrenheit = Number.parseFloat(($scope.weather.celsius * 1.8 + 32).toFixed(2));
  };
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
