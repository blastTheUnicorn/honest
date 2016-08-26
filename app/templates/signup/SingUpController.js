angular.module('SingUpController', [])
.controller('SignUpCtrl', function($scope, $location, $http, Token){
  $scope.user = {};

  $scope.signUp = function(){
    return $http({
      method: 'POST',
      url: '/api/signUp',
      contentType: 'application/json',
      data: $scope.user
    }).then(function(res){
      Token.saveToken(res.data.token)
      $location.path('/home')
      return res;
    })
  }

})
