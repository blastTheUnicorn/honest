angular.module('HomeController', ['uiGmapgoogle-maps'])

.controller('HomeCtrl', function($scope, $location, $http, Token, $mdMedia){
  $scope.coordenates = {center: {latitude: 45, longitude: -72 }, zoom: 15};
  $scope.output = document.getElementById("mapView");
  $scope.options = {enableHighAccuracy: true};
  $scope.control = {}


$scope.currentLocation = function(){
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  navigator.geolocation.getCurrentPosition(function(pos) {
    $scope.coordenates.center.latitude = pos.coords.latitude;
    $scope.coordenates.center.longitude = pos.coords.longitude;
    $scope.control.refresh($scope.coordenates.center)
  }, 
  function(error) {                    
      alert('Unable to get location: ' + error.message);
  }, $scope.options);
}();

});












