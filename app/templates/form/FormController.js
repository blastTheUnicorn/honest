angular.module('FormController', [])
.controller('FormCtrl', function($scope, $http, Token, $location, $mdToast){
  
  // store all form data in this object
  $scope.formData = {
    position: $scope.position
  };

  // function to process our form
  $scope.processForm = function () {
    if(!$scope.formData.type && !$scope.formData.colors && !$scope.formData.lostOrFound){
      $mdToast.show(
        $mdToast.simple()
        .textContent('Fill All The Fields')
        .parent(document.querySelectorAll('#toaster'))
        .action('Go Back To Step #1')
        .theme('error-toast')
        .capsule(true)
        .hideDelay(3000) 
        .position('right')
      ).then(function(response) {
        if ( response == 'ok' ) {
          $location.path('/form/location')
        }
      });
    }else{
      var userID = Token.currentUser()
      return $http.post('/api/user/' + userID, $scope.formData)
      .success(function(data){
        $scope.formData = {};
        $mdToast.show(
          $mdToast.simple()
          .textContent('Item has been saved')
          .parent(document.querySelectorAll('#toaster'))
          .action('Go To Feed')
          .theme('success-toast')
          .capsule(true)
          .hideDelay(3000)
          .position('right')
        ).then(function(response) {
        if ( response == 'ok' ) {
          $location.path('/feed')
        }
      });
      })
      .error(function(err){
        $scope.formData = {};
        $mdToast.show(
          $mdToast.simple()
          .textContent('There Was An Error, Try Again')
          .capsule(true)
          .hideDelay(3000)
          .position('right')
        )
      })
    }
  };

});
