angular.module('FormController', [])
.controller('FormCtrl', function($scope, $http, Token, $location, $mdToast){
  
  // store all form data in this object
  $scope.formData = {};

  $scope.sendEmail = function () {
    var userID = Token.currentUser()
    console.log('triggered')
    $http.get('/api/' + userID + '/send').success(function(){
        console.log('sent!')
        $scope.emailSent = "Sent babay!";
    });

  }
  // function to process our form
  $scope.processForm = function () {
    if(!$scope.formData.lostOrFound || !$scope.formData.position){
      console.log("Testing", $scope.formData);
      $mdToast.show(
        $mdToast.simple()
        .textContent('Fill All The Fields')
        .action('Go Back To Step #1')
        .theme('error-toast')
        .capsule(true)
        .hideDelay(4000) 
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
          .action('Go To Feed')
          .theme('success-toast')
          .capsule(true)
          .hideDelay(4000)
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
          .hideDelay(4000)
        )
      })
    }
  };



});
