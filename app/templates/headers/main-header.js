angular.module('MainController', [])

.controller('MainCtrl', function($scope, $location, Token){

  $scope.logout = function(){
    Token.logOut();
  };

  $scope.goToFeed = function(){
    $location.path('/feed');
  };

  $scope.goToForm = function(){
    $location.path('/form/location');
  };
});
