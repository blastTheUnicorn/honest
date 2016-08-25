angular.module('SingUpController', [])
.controller('SignUpCtrl', function($scope, $location, $http){
  $scope.user = {};

  $scope.signUp = function(){
    return $http({
      method: 'POST',
      url: '/api/signUp',
      contentType: 'application/json',
      data: $scope.user
    }).then(function(res){
      $location.path('/home')
      return res;
    })
  }

})