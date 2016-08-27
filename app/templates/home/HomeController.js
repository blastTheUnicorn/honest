angular.module('HomeController', ['uiGmapgoogle-maps'])

.controller('HomeCtrl', function($scope, $location, $http, Token, $mdMedia){
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  $scope.options = {scrollwheel: false};
  var options = {enableHighAccuracy: true};

  navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.center = $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      $scope.map.zoom = 15;
      console.log(JSON.stringify($scope.position));                  
  }, 
  function(error) {                    
      alert('Unable to get location: ' + error.message);
  }, options);

});












