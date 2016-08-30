angular.module('FormController', [])
.controller('FormCtrl', function($scope){
  
  // store all form data in this object
  $scope.formData = {
    position: $scope.position
  };

  // function to process our form
  $scope.processForm = function () {
    alert('awesome!');
  }

});