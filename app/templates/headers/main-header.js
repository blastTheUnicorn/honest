angular.module('MainController', [])

.controller('MainCtrl', function($scope, $location, Token){

  $scope.logout = function(){
    Token.logOut()
  }

  $scope.goToFeed = function(){
    console.log("!!!!!FEED");
    $location.path('/feed')
  }

  $scope.goToForm = function(){
    console.log('form!!!!!!!')
    $location.path('/form/location')
  }
})
