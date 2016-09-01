angular.module('FormController', [])
.controller('FormCtrl', function($scope, $http, Token, $location){
  
  // store all form data in this object
  $scope.formData = {
    position: $scope.position
  };

  // function to process our form
  $scope.processForm = function () {
    var userID = Token.currentUser()
    return $http.post('/api/user/' + userID, $scope.formData).success(function(data){
      console.log("Testing", data);
      $location.path('/form/location');
      $scope.formData = {};
    })
  };

});
