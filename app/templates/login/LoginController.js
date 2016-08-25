angular.module('LoginController', []).controller('LoginCtrl', function($scope, $location, $http, Token){
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
    }).then(function successCallback(res){
      console.log("Testing", res);
      Token.saveToken(res.data.token)
      $location.path('/home')
      return res;
    }, function errorCallback(res){
      console.log(res);
    } )
  }


});