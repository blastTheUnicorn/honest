angular.module('HomeController', ['uiGmapgoogle-maps'])

.controller('HomeCtrl', function($scope, $location, $http, Token, $mdMedia){
  $scope.lost = false;
  $scope.found = false;
  $scope.coordenates = {center: {latitude: 45, longitude: -72 }, zoom: 15 , options : {scrollwheel: false}}
  $scope.output = document.getElementById("mapView");
  $scope.options = {enableHighAccuracy: true};
  $scope.flag = false;
  $scope.check = false;
  $scope.started = false;
  $scope.coordenates.control = {};
  $scope.load = true;
  $scope.marker = {options: {draggable: true},
    events: {
      dragend: function (marker, eventName, args) {
      console.log('marker dragend');
      $scope.coordenates.center.latitude = marker.getPosition().lat();
      $scope.coordenates.center.longitude = marker.getPosition().lng();
    }
   }
  };

  $scope.searchbox = { 
    position:'TOP_CENTER',
    // template:'/searchbox.tpl.html', 
    parentdiv:'searchBoxParent',
    events:{
      places_changed: function (searchBox) {
        $scope.flag = false;
        var places =searchBox.getPlaces()
        $scope.coordenates.center.latitude = places[0].geometry.location.lat()
        $scope.coordenates.center.longitude = places[0].geometry.location.lng()
        $scope.coordenates.control.refresh($scope.coordenates.center)
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
      $scope.coordenates.center.latitude = pos.coords.latitude;
      $scope.coordenates.center.longitude = pos.coords.longitude;
      $scope.load = false;
      $scope.coordenates.control.refresh($scope.coordenates.center)
    }, 
    function(error) {                    
        alert('Unable to get location: ' + error.message);
    }, $scope.options);
  };
  $scope.currentLocation();

  $scope.placeMarker = function(){
    $scope.check = !$scope.check
    $scope.flag = !$scope.flag
    $scope.marker.coords = $scope.coordenates.center;
  };

  $scope.setLocation = function(LostOrFound){
  if(LostOrFound === 'lost'){
    $scope.lost = true;
  } else {
    $scope.found = true;
  }   
    $scope.formData.lostOrFound = LostOrFound;
    $scope.formData.position = [$scope.coordenates.center.longitude, $scope.coordenates.center.latitude]
  };

});
