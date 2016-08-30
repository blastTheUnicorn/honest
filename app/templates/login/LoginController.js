angular.module('LoginController', []).controller('LoginCtrl', function($scope, $location, $http, Token, $mdMedia){
  
  $scope.user = {};

  $scope.$watch(function() { return $mdMedia('lg'); }, function(big) {
    $scope.bigScreen = big;
  });
  $scope.screenIsSmall = $mdMedia('sm');
  $scope.customQuery = $mdMedia('(min-width: 1234px)');
  $scope.anotherCustom = $mdMedia('max-width: 300px');
  
  // console.log($scope.$mdMedia)

  $scope.goHome = function(){
    if($scope.user.username === 'atlante' && $scope.user.password === 'july292006'){
      console.log('change location: ')
      $location.path('/home')
    }    
  }

  $scope.login = function(){
    console.log("Testing");
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
