angular.module('HomeController', ['uiGmapgoogle-maps'])

.controller('HomeCtrl', function($scope, $location, $http, Token, $mdMedia){
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
});