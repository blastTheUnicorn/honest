angular.module('HomeController', ['uiGmapgoogle-maps'])

.controller('HomeCtrl', function($scope, $location, $http, Token, $mdMedia){
  $scope.coordenates = {center: {latitude: 45, longitude: -72 }, zoom: 15 , options : {scrollwheel: false}}
  $scope.output = document.getElementById("mapView");
  $scope.options = {enableHighAccuracy: true};
  $scope.flag = false;
  $scope.control = {};
  $scope.load = true;
  $scope.marker = {options: {draggable: true},
    events: {
      dragend: function (marker, eventName, args) {
      console.log('marker dragend');
      $scope.coordenates.center.latitude = marker.getPosition().lat();
      $scope.coordenates.center.longitude = marker.getPosition().lng();
      $scope.formData.position = [marker.getPosition().lng(), marker.getPosition().lat()]

    }
   }
  };

  $scope.searchbox = { 
    position:'TOP_CENTER',
    // template:'/searchbox.tpl.html', 
    events:{
      places_changed: function (searchBox) {
        $scope.flag = false;
        $scope.formData.position = {}
        var places =searchBox.getPlaces()
        $scope.coordenates.center.latitude = places[0].geometry.location.lat()
        $scope.coordenates.center.longitude = places[0].geometry.location.lng()
        $scope.control.refresh($scope.coordenates.center)
      }
    }
  };


  $scope.currentLocation = function(){
    $scope.load = true
    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }
    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.flag = false;
      $scope.formData = {}
      $scope.coordenates.center.latitude = pos.coords.latitude;
      $scope.coordenates.center.longitude = pos.coords.longitude;
      $scope.load = false;
      $scope.control.refresh($scope.coordenates.center)
    }, 
    function(error) {                    
        alert('Unable to get location: ' + error.message);
    }, $scope.options);
  };
  $scope.currentLocation();

  $scope.placeMarker = function(){
    $scope.flag = !$scope.flag
    $scope.marker.coords = $scope.coordenates.center;
  };

  $scope.setLocation = function(LostOrFound){
    $scope.placeMarker()
    $scope.formData.lostOrFound = LostOrFound;
    $scope.formData.position = [$scope.coordenates.center.longitude, $scope.coordenates.center.latitude]
  };

});
