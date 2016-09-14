angular.module('SingUpController', [])

.controller('SignUpCtrl', function($scope, $location, $http, Token, $mdToast){
  $scope.user = {};

  $scope.signUp = function(){
    return $http({
      method: 'POST',
      url: '/api/signUp',
      contentType: 'application/json',
      data: $scope.user
    }).then(function successCallback(res){
      Token.saveToken(res.data.token)
      $location.path('/form/location')
      return res;
    }, function errorCallback(res){
      $mdToast.show(
        $mdToast.simple()
        .textContent('User or Email already exists')
        .capsule(true)
        .hideDelay(3000) 
        .position('right')
      )
    })
  };

})
