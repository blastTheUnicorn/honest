angular.module('LoginController', []).controller('LoginCtrl', function($scope, $location){
  $scope.user = {};

  $scope.goHome = function(){
    if($scope.user.username === 'atlante' && $scope.user.password === 'july292006'){
      console.log('change location: ')
      $location.path('/home')
    }    
  }

});