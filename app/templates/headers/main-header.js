angular.module('MainController', [])

.controller('MainCtrl', function($scope, $location, Token){

  $scope.logout = function(){
    Token.logOut()
  }
})
