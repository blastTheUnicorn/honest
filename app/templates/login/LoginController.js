angular.module('LoginController', []).controller('LoginCtrl', function($scope){
  $scope.user = {};

  $scope.goHome = function(){
    console.log('hey there!');
  }

});