angular.module('LoginController', []).controller('LoginCtrl', function($scope, $location, $http){
  $scope.user = {};

  $scope.goHome = function(){
    if($scope.user.username === 'atlante' && $scope.user.password === 'july292006'){
      console.log('change location: ')
      $location.path('/home')
    }    
  }

  $scope.login = function(){
    return $http({
      method: 'POST',
      url: '/api/login',
      contentType: 'application/json',
      data: $scope.user
    }).then(function(res){
      $location.path('/home')
      return res;
    })
  }


});