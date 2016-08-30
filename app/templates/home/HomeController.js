angular.module('HomeController', ['uiGmapgoogle-maps'])

// .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
//   GoogleMapApi.configure({
//    key: 'AIzaSyC8QyS0EKhqSKmQp3zl8NUwvlgcN-6GUgQ',
//     v: '3.17',
//     libraries: 'places'
//   });
// }])

.controller('HomeCtrl', function($scope, $location, $http, Token, $mdMedia){
  $scope.coordenates = {center: {latitude: 45, longitude: -72 }, zoom: 15 , options : {scrollwheel: false}}
  $scope.output = document.getElementById("mapView");
  $scope.options = {enableHighAccuracy: true};
  $scope.flag = false;
  $scope.control = {};
  $scope.marker = {options: {draggable: true},
    events: {
      dragend: function (marker, eventName, args) {
      console.log('marker dragend');
      $scope.marker.coords.latitude = marker.getPosition().lat();
      $scope.marker.coords.longitude = marker.getPosition().lng();
    }
   }
  }

  $scope.searchbox = { 
    position:'TOP_CENTER',
    // template:'/searchbox.tpl.html', 
    events:{
      places_changed: function (searchBox) {
        var places =searchBox.getPlaces()
        $scope.coordenates.center.latitude = places[0].geometry.location.lat()
        $scope.coordenates.center.longitude = places[0].geometry.location.lng()
        $scope.control.refresh($scope.coordenates.center)
      }
    }
  }


$scope.currentLocation = function(){
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  navigator.geolocation.getCurrentPosition(function(pos) {
    $scope.coordenates.center.latitude = pos.coords.latitude;
    $scope.coordenates.center.longitude = pos.coords.longitude;
    console.log($scope.coordenates.center)
    $scope.control.refresh($scope.coordenates.center)
  }, 
  function(error) {                    
      alert('Unable to get location: ' + error.message);
  }, $scope.options);
}();

$scope.placeMarker = function(){
  $scope.flag = !$scope.flag
  $scope.marker.coords = $scope.coordenates.center;
}

});












